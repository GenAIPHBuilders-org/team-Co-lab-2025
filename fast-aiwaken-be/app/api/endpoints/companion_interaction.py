from fastapi import APIRouter, Depends, HTTPException, Query, status
from app.core.companion import CompanionLogic
from app.core.llm_client import llm_client
from typing import List, Dict, Any, Optional
from app.static_data.game_data import COMPANION_DETAILS
from app.schemas.user import CompanionSelection, User
from app.dependencies import get_db, get_current_user
from sqlalchemy.orm import Session
from app.controller import user_controller as user_service
import json
from pydantic import BaseModel
from app.db.models import Course
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.user import User
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

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
                               difficulty: str = Query(..., description="The difficulty level, e.g., 'easy'")):
    """
    Generates and returns the structured outline for a course, including sections,
    topics, and learning steps with material type suggestions
    """  
    course_structure = llm_client.generate_structured_course(subject, difficulty)
    if not course_structure or course_structure.get("error"):
        raise HTTPException(status_code=500, detail=f"Failed to generate course structure: {course_structure.get('error', 'Unknown LLM error')}")
    if not course_structure.get("sections"): # Basic validation
        raise HTTPException(status_code=500, detail="Generated course structure is invalid or empty.")
    
    return course_structure

# course with structure and learning steps
@router.get("/course/learning_step_content", response_model=Dict[str, Any])
async def get_learning_step_content_api(
    subject: str = Query(..., description="Subject of the course"),
    topic_title: str = Query(..., description="Title of the parent topic"),
    step_title: str = Query(..., description="Title of the specific learning step"),
    material_type_suggestion: str = Query(..., description="Suggested material type, e.g., 'text', 'youtube_video'"),
    difficulty: str = Query(..., description="Difficulty level of the course context"),
    companion_name: str = Query("Gabriel", description="Name of the companion (e.g., Gabriel, Brian, Ryan, Kent)") 
):
    content_details = llm_client.generate_learning_step_content(
        subject=subject,
        topic_title=topic_title,
        step_title=step_title,
        material_type_suggestion=material_type_suggestion,
        difficulty=difficulty,
        companion_name=companion_name
    )
    if not content_details or content_details.get("error"):
        raise HTTPException(status_code=500, detail="Failed to generate learning step content.")
    return content_details


# interactive quiz place holder
@router.get("/course/learning_step_quiz", response_model=Dict[str, Any])
async def get_learning_step_quiz(
    subject: str = Query(..., description="The subject of the course"),
    topic_title: str = Query(..., description="The title of the topic"),
    step_title: str = Query(..., description="The title of the specific learning step"),
    difficulty: str = Query(..., description="The difficulty level of the course"),
    enemy_theme: Optional[str] = Query("a mischievous goblin", description="Name of the monster or boss delivering the quiz")
):
    """
    Generate a 5-question multiple-choice quiz for the specified learning step.
    """
    # Dynamically generate the theme introduction using the LLM
    theme_intro_prompt = (
        f"Generate a dynamic and engaging introduction for a quiz. The introduction should be themed around "
        f"a character named '{enemy_theme}' who challenges the learner to complete the quiz. "
        f"Make it fun, interactive, and motivational."
    )
    theme_intro = llm_client.generate_content(theme_intro_prompt)

    # Build the prompt for the quiz
    prompt = (
        f"{theme_intro}\n\n"
        f"Generate a 5-question multiple-choice quiz for the learning step '{step_title}' "
        f"in the topic '{topic_title}' for the subject '{subject}' at {difficulty} level. "
        f"Each question should:\n"
        f"- Be directly related to the learning step '{step_title}' and the topic '{topic_title}'.\n"
        f"- Be themed as if posed by '{enemy_theme}', but vary the phrasing for each question introduction. "
        f"For example, use phrases like 'The {enemy_theme} wonders...', 'The {enemy_theme} challenges you...', "
        f"'The {enemy_theme} growls...', or 'The {enemy_theme} asks...'.\n"
        f"- Have a 'question_text' (string).\n"
        f"- Have an 'options' array of 4 strings (one correct, three plausible distractors).\n"
        f"- Have a 'correct_answer' string (must exactly match one of the options).\n"
        f"- Have a brief 'explanation' string for why the answer is correct (1-2 sentences).\n\n"
        f"Ensure the questions are unique, engaging, and varied. Avoid repeating similar questions.\n\n"
        f"Return the quiz as a valid JSON object with the following structure:\n"
        f"{{\n"
        f"  \"quiz\": [\n"
        f"    {{\n"
        f"      \"question_text\": \"The {enemy_theme} asks, 'What is 2 + 2?'\",\n"
        f"      \"options\": [\"3\", \"4\", \"5\", \"22\"],\n"
        f"      \"correct_answer\": \"4\",\n"
        f"      \"explanation\": \"Basic addition: 2 + 2 equals 4.\"\n"
        f"    }}\n"
        f"  ]\n"
        f"}}\n"
        f"Ensure the JSON is well-formed and does not include any additional text or formatting outside the JSON object."
    )

    # Generate the quiz using the LLM
    quiz = llm_client.generate_content(prompt, is_json_output=True)
    if not quiz or quiz.get("error"):
        raise HTTPException(status_code=500, detail="Failed to generate quiz content.")
    return {"quiz": quiz}

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


    # conclusion_data = dynamic_content_service.get_course_summary_and_quiz(course_title, subject, difficulty, sections_data, enemy_theme)
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

    # Add topics_covered to the response
    conclusion_data["topics_covered"] = topics_covered
    return conclusion_data

@router.put("/select-companion", response_model=User)
def select_companion(
    selection: CompanionSelection,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> User:
    companion_name = selection.companion_name

    if companion_name not in COMPANION_DETAILS:
        raise HTTPException(
            status_code=400,
            detail="Invalid companion name. Choose from: " + ", ".join(COMPANION_DETAILS.keys())
        )

    updated_user = user_service.update_user_companion(db, current_user, companion_name)
    return updated_user

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




    