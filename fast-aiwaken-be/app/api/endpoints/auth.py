from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session


from app.controller import user_controller as user
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
    """
    Register a new user.
    """
    user = user.get_user_by_email(db, email=user_in.email)
    if user:
        raise DuplicateEmailError()
    
    username_exists = user.get_user_by_username(db, username=user_in.username)
    if username_exists:
        raise DuplicateUsernameError()
    
    user = user.create_user(db, user_in=user_in)
    return user

@router.post("/login", response_model=Token)
def login(
    db: Session = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends(),
) -> Token:
    """
    Get access token for user.
    """
    user = user.authenticate_user(
        db, username_or_email=form_data.username, password=form_data.password
    )
    if not user:
        raise InvalidCredentialsError()
    
    if not user.is_active:
        raise InactiveUserError()
    
    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        subject=user.id, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
    }

@router.get("/me", response_model=User)
def get_current_user_info(
    current_user: User = Depends(get_current_user),
) -> User:
    """
    Get current user information.
    """
    return current_user