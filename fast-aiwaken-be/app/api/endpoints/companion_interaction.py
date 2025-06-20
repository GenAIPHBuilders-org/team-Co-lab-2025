from uuid import uuid4
import json
import os
from fastapi import APIRouter, Depends, HTTPException, Query
from app.core.companion import CompanionLogic
from app.core.llm_client import llm_client
from typing import List, Dict, Any, Optional
from app.static_data.game_data import COMPANION_DETAILS
from app.schemas.user_schema import User
from app.schemas.companion_schema import CompanionSelection
from app.dependencies import get_db, get_current_user
from sqlalchemy.orm import Session
from app.controller import user_controller as user_service
from app.core.prompt_engineering import quiz_prompts
from pydantic import BaseModel
from fastapi.responses import FileResponse
from app.core.utils.redis_client import store_in_redis, get_from_redis
from app.services.preferences_service import PreferencesService
from app.schemas.bossBattleSchema import BossSubmission, AdaptiveQuizRequest

router = APIRouter()

# quiz hint request model
class QuizHintRequest(BaseModel):
    quiz_question: str
    topic_title: str

# --- Course Section ---
# course structure
@router.get("/course/structure", response_model=Dict[str, Any])
async def get_course_structure(
    subject: str = Query(..., description="The subject of the course, e.g., 'mathematics'"),
    difficulty: str = Query(..., description="The difficulty level, e.g., 'easy'"),
    current_user: User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    # user details
    user_id = current_user.id
    username = current_user.username

    # redis key for user-specific course
    redis_key = f"course:{user_id}:{subject}:{difficulty}"
    
    # cached course retrieval
    cached_course = get_from_redis(redis_key)
    if cached_course:
        print(f"Retrieved cached:{username}:{redis_key}")
        return cached_course
    
    # user preferences
    preferences_service = PreferencesService(db)
    preferences = await preferences_service.get_user_preferences(user_id)

    if not preferences:
        raise HTTPException(status_code=404, detail="User preferences not found.")

    # extract companion name and other preferences
    companion_name = preferences.companion
    age_range = preferences.age_range
    motivational_level = preferences.motivation_level
    learning_goal = preferences.learning_goal
    explanation_depth = preferences.explanation_depth
    learning_style = preferences.learning_style

    # generate course structure
    course_structure = llm_client.generate_structured_course(
        subject=subject,
        difficulty=difficulty,
        username=username,
        companion_name=companion_name,
        age_range=age_range,
        motivational_level=motivational_level,
        learning_goal=learning_goal,
        explanation_depth=explanation_depth,
        learning_style=learning_style
    )

    if not course_structure or course_structure.get("error"):
        raise HTTPException(status_code=500, detail=f"Failed to generate course structure: {course_structure.get('error', 'Unknown LLM error')}")
    if not course_structure.get("sections"):
        raise HTTPException(status_code=500, detail="Generated course structure is invalid or incomplete.")

    store_in_redis(redis_key, course_structure, ttl=3600)
    print(f"Stored course structure in cache for {username}:{redis_key}")

    return course_structure

# --- Course Utils ---
# course motivation
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

# course conclusion for quiz and summary
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
        
        # Generate course ID for consistency with boss battles
        course_id = str(uuid4())
        
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON format for sections_data_json.")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    conclusion_data = llm_client.generate_course_summary_and_quiz(
        course_title, 
        subject, 
        difficulty, 
        sections_data, 
        enemy_theme
    )

    # extract topics covered
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

    # Add course_id and topics_covered to response
    conclusion_data["course_id"] = course_id
    conclusion_data["topics_covered"] = topics_covered
    return conclusion_data

# quiz submission
@router.post("/quiz/submit", response_model=Dict[str, Any])
async def submit_quiz_answer():
    # TODO: Implement quiz submission logic
    pass

# --- Companion Section ---
# companion details
@router.get("/companion/details", response_model=Dict[str, Any])
async def get_companion_details():
    return {"companions": COMPANION_DETAILS}

# select companion
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
    # Enhanced hint generation with RAG context
    context = llm_client.retrieve_rag_context(
        filter_fn=lambda item:(
            request.topic_title.lower() in item.get("topic_title","").lower()
            or request.quiz_question.lower() in (item.get("content") or "").lower()
        ),
        max_items=5
    )
    
    hint = llm_client.generate_quiz_hint(
        quiz_question=request.quiz_question,
        topic_title=request.topic_title,
        context=context
    )
    return {"hint": hint}

# --- Boss Battle Section ---
@router.post("/boss/submit", response_model=Dict[str, Any])
async def submit_boss_battle(
    submission: BossSubmission,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Analyze performance
    analysis = llm_client.analyze_boss_performance(
        user_answers=submission.user_answers,
        quiz_data=submission.quiz_data,
        course_id=str(submission.course_id)
    )
    
    # Update user stats
    if analysis["accuracy"] == 1.0:
        current_user.boss_wins += 1
    else:
        current_user.boss_losses += 1
    
    # Update weak topics
    current_user.weak_topics = analysis["weaknesses"]
    
    db.commit()
    db.refresh(current_user)
    
    # Generate feedback
    companion_name = current_user.selected_companion or "Gabriel"
    feedback = CompanionLogic.generate_boss_feedback(analysis, companion_name)
    
    return {
        "feedback": feedback,
        "analysis": analysis,
        "passed": analysis["accuracy"] == 1.0
    }

@router.post("/boss/retry", response_model=Dict[str, Any])
async def get_adaptive_boss_quiz(
    request: AdaptiveQuizRequest
):
    return llm_client.generate_adaptive_boss_quiz(
        subject=request.subject,
        difficulty=request.difficulty,
        enemy_theme=request.enemy_theme,
        course_id=str(request.course_id)
    )

# --- Memory Section ---
# clear redis cache
@router.delete("/course/clear/cache", response_model=Dict[str, str])
async def clear_course_cache(
    subject: str = Query(..., description="The subject of the course"),
    difficulty: str = Query(..., description="The difficulty level of the course"),
    current_user: User = Depends(get_current_user)
):
    user_id = current_user.id
    redis_key = f"course:{user_id}:{subject}:{difficulty}"
    
    # Import redis_client for cache clearing
    from app.core.utils.redis_client import redis_client
    redis_client.delete(redis_key)
    return {"message": f"Cache cleared for {redis_key}"}

# course cache
@router.get("/course/structure/cache", response_model=Dict[str, Any])
async def get_course_cache(
    subject: str = Query(..., description="The subject of the course"),
    difficulty: str = Query(..., description="The difficulty level of the course"),
    current_user: User = Depends(get_current_user)
):
    user_id = current_user.id
    # redis key for user-specific course
    redis_key = f"course:{user_id}:{subject}:{difficulty}"
    cached_course = get_from_redis(redis_key)
    
    if not cached_course:
        raise HTTPException(status_code=404, detail=f"No cached course found for {redis_key}") 
    return cached_course