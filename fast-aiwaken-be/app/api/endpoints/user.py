from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies import get_db, get_current_user
from app.models.user_model import User
from app.schemas.user_schema import User as UserSchema
from app.controller import user_controller as user_service

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