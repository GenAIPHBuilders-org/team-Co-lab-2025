from fastapi import APIRouter, Depends, HTTPException, Query
from app.core.companion import CompanionLogic
from app.core.llm_client import llm_client
from typing import List, Dict, Any, Optional
from app.static_data.game_data import COMPANION_DETAILS
from app.schemas.userSchema import CompanionSelection, User
from app.dependencies import get_db, get_current_user
from sqlalchemy.orm import Session
from app.controller import user_controller as user_service
import json
from pydantic import BaseModel
from fastapi.responses import FileResponse
import os



router = APIRouter()


# quiz hint request model
class QuizHintRequest(BaseModel):
    quiz_question: str
    topic_title: str

# companion details
@router.get("/companion/details", response_model=Dict[str, Any])
async def get_companion_details():
    return {"companions": COMPANION_DETAILS}

# course structure
@router.get("/course/structure", response_model=Dict[str, Any])
async def get_course_structure(subject: str = Query(..., description="The subject of the course, e.g., 'mathematics'"),
                               difficulty: str = Query(..., description="The difficulty level, e.g., 'easy'"),
                               enemy_theme: Optional[str] = Query("a mischevious goblin", description = "Theme for enemy delivering the content")):
  
    course_structure = llm_client.generate_structured_course(subject, difficulty, enemy_theme)
    if not course_structure or course_structure.get("error"):
        raise HTTPException(status_code=500, detail=f"Failed to generate course structure: {course_structure.get('error', 'Unknown LLM error')}")
    if not course_structure.get("sections"): 
        raise HTTPException(status_code=500, detail="Generated course structure is invalid or empty.")
    
    return course_structure

# user motivation
@router.get("/course/quiz_motivation", response_model=Dict[str, Any])
async def get_quiz_motivation(
    subject: str = Query(..., description="The title of the current topic"),
    companion_name: str = Query("Gabriel", description="The name of the companion (e.g., Gabriel, Brian, Ryan, Kent)")
):
    """
    Generate a motivational message to encourage the user to take the quiz.
    """
    motivation = CompanionLogic.generate_quiz_motivation(companion_name, subject)
    return {"motivation": motivation}

# tips for user
@router.get("/course/tips", response_model=Dict[str, Any])
async def get_tips(
    subject: str = Query(..., description="The subject of the course"),
    topic_title: str = Query(..., description="The title of the topic"),
    step_title: str = Query("", description="The title of the specific learning step (optional)"),
    difficulty: str = Query(..., description="The difficulty level of the course"),

):
    """
    Generate actionable tips for a specific topic or learning step.
    """
    tips = llm_client.generate_tips(
        subject=subject,
        topic_title=topic_title,
        step_title=step_title,
        difficulty=difficulty,
    )
    return {"tips": tips}

# course conclusion endpoint for quiz and summary
@router.post("/course/conclusion", response_model=Dict[str, Any])
async def get_course_conclusion_api(
    course_title: str = Query(..., description="Title of the course"),
    subject: str = Query(..., description="Subject of the course"),
    difficulty: str = Query(..., description="Difficulty level"),
    sections_data_json: str = Query(..., description="JSON string of course sections/topics covered"),
    enemy_theme: Optional[str] = Query("a cunning quizmaster", description="Theme for the enemy delivering the quiz")
):
    try:
        sections_data = json.loads(sections_data_json)
        if not isinstance(sections_data, list):
            raise ValueError("sections_data_json must be a JSON array of sections.")
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON format for sections_data_json.")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    conclusion_data = llm_client.generate_course_summary_and_quiz(course_title, subject, difficulty, sections_data, enemy_theme)

    # Extract topics covered
    topics_covered = []
    for section in sections_data:
        for topic in section.get("topics", []):
            topic_title = topic.get("topic_title")
            if topic_title:
                topics_covered.append(topic_title)

    if not conclusion_data or conclusion_data.get("error"):
        raise HTTPException(status_code=500, detail=f"Failed to generate course conclusion: {conclusion_data.get('error', 'Unknown LLM error')}")
    if not conclusion_data.get("summary") or not conclusion_data.get("quiz"):
        raise HTTPException(status_code=500, detail="Generated course conclusion is invalid or incomplete.")

    
    conclusion_data["topics_covered"] = topics_covered
    return conclusion_data

@router.put("/select-companion", response_model=User)
def select_companion(
    selection: CompanionSelection,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> User:
    companion_name = selection.companion_name

    if companion_name not in COMPANION_DETAILS:
        raise HTTPException(
            status_code=400,
            detail="Invalid companion name. Choose from: " + ", ".join(COMPANION_DETAILS.keys())
        )

    updated_user = user_service.update_user_companion(db, current_user, companion_name) 
    return User.model_validate(updated_user)

@router.get("/companions", response_model=List[str])
def get_available_companions():
    return list(COMPANION_DETAILS.keys())

# user hint
@router.post("/hint")
def get_quiz_hint(request: QuizHintRequest):
    hint = llm_client.generate_quiz_hint(
        quiz_question=request.quiz_question,
        topic_title=request.topic_title
    )
    return {"hint": hint}




    