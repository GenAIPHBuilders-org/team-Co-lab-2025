from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
from app.dependencies import get_db, get_current_user
from app.schemas.user_schema import User
from app.schemas.topic_schema import (
    TopicCreate, 
    TopicResponse, 
    TopicListResponse, 
    UserTopicProgressResponse,
    TopicCompletionRequest
)
from app.schemas.user_achievement_schema import UserAchievementWithDetails
from app.services.topic_service import TopicService
from app.models.user_achievements_model import UserAchievements
from app.models.achievements_model import Achievement

router = APIRouter()

@router.post("/", response_model=TopicResponse)
async def create_topic(
    topic_data: TopicCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Create a new topic
    """
    topic_service = TopicService(db)
    topic = topic_service.create_topic(topic_data)
    
    return TopicResponse(
        id=topic.id,
        name=topic.name,
        icon=topic.icon,
        color=topic.color,
        difficulty=topic.difficulty,
        description=topic.description,
        rewards=topic.rewards,
        min_level_required=topic.min_level_required,
        created_at=topic.created_at,
        updated_at=topic.updated_at,
        locked=False,
        completion_percentage=None,
        is_completed=None
    )

@router.get("/", response_model=TopicListResponse)
async def get_topics(
    skip: int = Query(0, ge=0, description="Number of topics to skip"),
    limit: int = Query(100, ge=1, le=100, description="Maximum number of topics to return"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get all available topics with user-specific information (locked status, progress)
    """
    topic_service = TopicService(db)
    result = topic_service.get_topics(current_user.id, skip=skip, limit=limit)
    
    return TopicListResponse(
        topics=result["topics"],
        total=result["total"]
    )

@router.get("/completed", response_model=TopicListResponse)
async def get_completed_topics(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    try:
        topic_service = TopicService(db)
        result = topic_service.get_topics(current_user.id, skip=0, limit=100)
        
        completed_topics = [
            topic for topic in result["topics"] 
            if topic.is_completed
        ]
        
        return TopicListResponse(
            topics=completed_topics,
            total=len(completed_topics)
        )
    except Exception as e:
        print(f"Debug - Error in completed topics: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching completed topics: {str(e)}")

@router.get("/available/unlocked", response_model=TopicListResponse)
async def get_unlocked_topics(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get only unlocked topics for the current user
    """
    topic_service = TopicService(db)
    result = topic_service.get_topics(current_user.id, skip=0, limit=100)
    
    # Filter unlocked topics
    unlocked_topics = [
        topic for topic in result["topics"] 
        if not topic.locked
    ]
    
    return TopicListResponse(
        topics=unlocked_topics,
        total=len(unlocked_topics)
    )

@router.get("/difficulty/{difficulty}", response_model=TopicListResponse)
async def get_topics_by_difficulty(
    difficulty: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get topics filtered by difficulty level
    """
    topic_service = TopicService(db)
    result = topic_service.get_topics(current_user.id, skip=0, limit=100)
    
    # Filter by difficulty
    filtered_topics = [
        topic for topic in result["topics"] 
        if topic.difficulty.lower() == difficulty.lower()
    ]
    
    return TopicListResponse(
        topics=filtered_topics,
        total=len(filtered_topics)
    )

@router.get("/latest", response_model=TopicResponse)
async def get_latest_topic(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get the most recently accessed topic for the current user
    """
    topic_service = TopicService(db)
    latest_topic = topic_service.get_latest_topic(current_user.id)
    
    if not latest_topic:
        raise HTTPException(status_code=404, detail="No topics have been accessed yet")
        
    return latest_topic

@router.get("/progress/all", response_model=List[UserTopicProgressResponse])
async def get_user_topic_progress(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get all topic progress for the current user
    """
    topic_service = TopicService(db)
    progress_list = topic_service.get_user_topic_progress(current_user.id)
    return progress_list


@router.get("/achievements", response_model=List[UserAchievementWithDetails])
async def get_user_achievements(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    try:
        user_achievements = db.query(UserAchievements).filter(
            UserAchievements.user_id == current_user.id
        ).all()
        
        achievements_data = []
        for user_achievement in user_achievements:
            achievement = db.query(Achievement).filter(
                Achievement.id == user_achievement.achievement_id
            ).first()
            
            if achievement:
                achievements_data.append(UserAchievementWithDetails(
                    id=user_achievement.id,
                    user_id=user_achievement.user_id,
                    achievement_id=user_achievement.achievement_id,
                    achievement_progress=user_achievement.achievement_progress,
                    achievement_title=achievement.achievement_title,
                    achievement_description=achievement.achievement_description,
                    achievement_icon=achievement.achievement_icon
                ))
        
        return achievements_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching user achievements: {str(e)}")

@router.get("/{topic_id}", response_model=TopicResponse)
async def get_topic(
    topic_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get a specific topic with user progress information
    """
    topic_service = TopicService(db)
    topic = topic_service.get_topic_by_id(topic_id, current_user.id)
    return topic

@router.delete("/{topic_id}")
async def delete_topic(
    topic_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    topic_service = TopicService(db)
    result = topic_service.delete_topic(topic_id)
    return result

@router.post("/{topic_id}/start", response_model=UserTopicProgressResponse)
async def start_topic(
    topic_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    topic_service = TopicService(db)
    progress = topic_service.start_topic(current_user.id, topic_id)
    return progress

@router.put("/{topic_id}/progress", response_model=UserTopicProgressResponse)
async def update_topic_progress(
    topic_id: UUID,
    completion_request: TopicCompletionRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update topic progress for the current user
    """
    topic_service = TopicService(db)
    progress = topic_service.update_topic_progress(
        current_user.id, 
        topic_id, 
        completion_request.completion_percentage
    )
    return progress

@router.get("/progress/{topic_id}", response_model=UserTopicProgressResponse)
async def get_topic_progress(
    topic_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get progress for a specific topic
    """
    topic_service = TopicService(db)
    
    # Get user progress for this topic
    progress_list = topic_service.get_user_topic_progress(current_user.id)
    for progress in progress_list:
        if progress.topic_id == topic_id:
            return progress
    
    raise HTTPException(status_code=404, detail="Topic progress not found")