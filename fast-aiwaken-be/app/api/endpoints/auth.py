from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.models.user import LoginRequest

from app.controller import user_controller as user_service
from app.schemas.user import User, UserCreate
from app.schemas.token import Token
from app.dependencies import get_db, get_current_user
from app.security import create_access_token
from app.config import settings
from app.exceptions import DuplicateEmailError, DuplicateUsernameError, InvalidCredentialsError, InactiveUserError

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

@router.post("/login", response_model=Token)
def login(credentials: LoginRequest, db: Session = Depends(get_db)) -> Token:

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
    
    return {
        "user": user_obj,
        "access_token": access_token,
        "token_type": "Bearer",
    }

@router.get("/current-user", response_model=User)
def get_current_user_info(
    current_user: User = Depends(get_current_user),
) -> User:

    return current_user