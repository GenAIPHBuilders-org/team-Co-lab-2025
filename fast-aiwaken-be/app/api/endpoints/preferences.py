from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies import get_db, get_current_user
from app.models.userModel import User
from app.schemas.preferencesSchema import Preferences, PreferencesCreate, PreferencesUpdate
from app.services.preferences_service import PreferencesService

router = APIRouter(tags=["preferences"])

@router.get("/", response_model=Preferences)
async def get_user_preferences(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Preferences:
    """Get user preferences"""
    preferences_service = PreferencesService(db)
    return await preferences_service.get_user_preferences(current_user.id)

@router.post("/", response_model=Preferences)
async def create_user_preferences(
    preferences: PreferencesCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Preferences:
    """Create user preferences"""
    preferences_service = PreferencesService(db)
    return await preferences_service.create_user_preferences(current_user.id, current_user, preferences)

@router.put("/", response_model=Preferences)
async def update_user_preferences(
    preferences: PreferencesUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Preferences:
    """Update user preferences"""
    preferences_service = PreferencesService(db)
    return await preferences_service.update_user_preferences(current_user.id, preferences)

@router.delete("/")
async def delete_user_preferences(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> dict:
    """Delete user preferences"""
    preferences_service = PreferencesService(db)
    await preferences_service.delete_user_preferences(current_user.id)
    return {"message": "Preferences deleted successfully"}