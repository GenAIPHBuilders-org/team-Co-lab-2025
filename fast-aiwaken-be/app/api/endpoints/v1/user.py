from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies import get_db, get_current_user
from app.models.user_model import User
from app.schemas.user_schema import User as UserSchema
from app.schemas.user_achievement_schema import UserAchievementWithDetails
from app.controller import user_controller as user_service
from app.models.user_achievements_model import UserAchievements
from app.models.achievements_model import Achievement
from typing import List
from app.services.topic_service import TopicService
from uuid import UUID

router = APIRouter(tags=["user"])

@router.get("/me", response_model=UserSchema)
def get_current_user_info(
    current_user: User = Depends(get_current_user),
) -> User:
    return current_user

@router.put("/me", response_model=UserSchema)
def update_user_info(
    user_update: UserSchema,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> User:
    return user_service.update_user(db, current_user.id, user_update) 

@router.get("/get-user-achievements", response_model=List[UserAchievementWithDetails])
def get_user_achievements(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> List[UserAchievementWithDetails]:
    try:
        # Debug: Check total achievements in database
        total_achievements = db.query(Achievement).count()
        print(f"Debug: Total achievements in database: {total_achievements}")
        
        # Debug: Check user achievements
        user_achievements_count = db.query(UserAchievements).filter(
            UserAchievements.user_id == current_user.id
        ).count()
        print(f"Debug: User achievements count: {user_achievements_count}")
        
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
        
        print(f"Debug: Returning {len(achievements_data)} achievements for user")
        return achievements_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching user achievements: {str(e)}")

@router.get("/debug/achievements", response_model=dict)
def debug_achievements(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    """
    Debug endpoint to see all achievements and user progress
    """
    try:
        # Get all achievements
        all_achievements = db.query(Achievement).all()
        
        # Get user achievements
        user_achievements = db.query(UserAchievements).filter(
            UserAchievements.user_id == current_user.id
        ).all()
        
        return {
            "total_achievements_in_db": len(all_achievements),
            "user_achievements_count": len(user_achievements),
            "all_achievements": [
                {
                    "id": str(achievement.id),
                    "title": achievement.achievement_title,
                    "description": achievement.achievement_description,
                    "icon": achievement.achievement_icon
                } for achievement in all_achievements
            ],
            "user_achievements": [
                {
                    "id": str(ua.id),
                    "achievement_id": str(ua.achievement_id),
                    "progress": ua.achievement_progress
                } for ua in user_achievements
            ]
        }
    except Exception as e:
        return {"error": str(e)}

@router.post("/test/assign-achievement/{achievement_id}")
def assign_test_achievement(
    achievement_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    """
    Test endpoint to manually assign an achievement to the current user
    """
    try:
        # Check if achievement exists
        achievement = db.query(Achievement).filter(Achievement.id == achievement_id).first()
        if not achievement:
            raise HTTPException(status_code=404, detail="Achievement not found")
        
        # Check if user already has this achievement
        existing = db.query(UserAchievements).filter(
            UserAchievements.user_id == current_user.id,
            UserAchievements.achievement_id == achievement_id
        ).first()
        
        if existing:
            return {"message": "User already has this achievement", "achievement": achievement.achievement_title}
        
        # Create new user achievement
        user_achievement = UserAchievements(
            user_id=current_user.id,
            achievement_id=achievement_id,
            achievement_progress=100  # Set to 100% for testing
        )
        
        db.add(user_achievement)
        db.commit()
        db.refresh(user_achievement)
        
        return {
            "message": "Achievement assigned successfully",
            "achievement_title": achievement.achievement_title,
            "user_achievement_id": str(user_achievement.id)
        }
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error assigning achievement: {str(e)}")