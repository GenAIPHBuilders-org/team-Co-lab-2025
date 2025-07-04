from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.models.user_model import LoginRequest

from app.controller import user_controller as user_service
from app.schemas.user_schema import User, UserCreate
from app.schemas.token_schema import TokenizedUser
from app.dependencies import get_db, get_current_user
from app.security import create_access_token
from app.config import settings
from app.exceptions import DuplicateEmailError, DuplicateUsernameError, InvalidCredentialsError, InactiveUserError
from app.services.preferences_service import PreferencesService
from app.services.stats_service import StatsService
from app.services.topic_service import TopicService
from app.models.user_achievements_model import UserAchievements as UserAchievement
from typing import List

router = APIRouter(tags=["auth"])

@router.post("/register", response_model=User)
def register(
    *,
    db: Session = Depends(get_db),
    user_in: UserCreate,
) -> User:

    user = user_service.get_user_by_email(db, email=user_in.email)
    if user:
        raise DuplicateEmailError()
    
    username_exists = user_service.get_user_by_username(db, username=user_in.username)
    if username_exists:
        raise DuplicateUsernameError()
    
    user = user_service.create_user(db, user_in=user_in)
    return user

@router.post("/login", response_model=TokenizedUser)
async def login(credentials: LoginRequest, db: Session = Depends(get_db)) -> TokenizedUser:

    user_obj = user_service.authenticate_user(
        db, credentials.dict()
    )

    if not user_obj:
        raise InvalidCredentialsError()

    if not user_obj.is_active:
        raise InactiveUserError()

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        subject=user_obj.id, expires_delta=access_token_expires
    )
    
    preferences_service = PreferencesService(db)
    stats_service = StatsService(db)
    stats = None
    preferences = None
    try:
        stats = stats_service.get_user_stats(user_obj.id)
        preferences = await preferences_service.get_user_preferences(user_obj.id)
    except HTTPException:
        pass
    
    return {
        "user": user_obj,
        "access_token": access_token,
        "token_type": "Bearer",
        "preferences": preferences,
        "stats": stats
    }

@router.get("/tokenized-user", response_model=TokenizedUser)
async def get_current_user_info(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> TokenizedUser:
    access_token = create_access_token(subject=current_user.id)
    
    preferences_service = PreferencesService(db)
    stats_service = StatsService(db)
    preferences = None
    stats = None
    try:
        stats = stats_service.get_user_stats(current_user.id)
        preferences = await preferences_service.get_user_preferences(current_user.id)
    except HTTPException:
        pass
    
    return {
        "user": current_user,
        "access_token": access_token,
        "token_type": "Bearer",
        "preferences": preferences,
        "stats": stats,
    }

@router.post("/set-new-user-status", response_model=User)
def set_new_user_status(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> User:
    user_service.setNewUser(db, current_user)
    return current_user