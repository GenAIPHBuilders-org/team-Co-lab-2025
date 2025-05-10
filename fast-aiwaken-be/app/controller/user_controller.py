from typing import Optional
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate
from app.security import get_password_hash, verify_password

def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.query(User).filter(User.email == email).first()

def get_user_by_username(db: Session, username: str) -> Optional[User]:
    return db.query(User).filter(User.username == username).first()

def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
    return db.query(User).filter(User.id == user_id).first()

def create_user(db: Session, user_in: UserCreate) -> User:
    db_user = User(
        email=user_in.email,
        username=user_in.username,
        hashed_password=get_password_hash(user_in.password),
        is_active=True,
        is_superuser=False,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, username_or_email: str, password: str) -> Optional[User]:
    # Try to find user by email first
    user = get_user_by_email(db, username_or_email)
    
    # If not found by email, try by username
    if not user:
        user = get_user_by_username(db, username_or_email)
    
    # If still not found or password doesn't match, return None
    if not user or not verify_password(password, user.hashed_password):
        return None
    
    return user