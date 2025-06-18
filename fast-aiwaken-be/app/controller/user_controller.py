from typing import Optional
from sqlalchemy.orm import Session
import re
from app.models.user_model import User
from app.schemas.user_schema import UserCreate
from app.security import get_password_hash, verify_password
import uuid
from app.models.user_stats_model import UserStats
from datetime import datetime

def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.query(User).filter(User.email == email).first()

def get_user_by_username(db: Session, username: str) -> Optional[User]:
    return db.query(User).filter(User.username == username).first()

def get_user_by_id(db: Session, user_id: uuid.UUID) -> Optional[User]:
    return db.query(User).filter(User.id == user_id).first()

def create_user(db: Session, user_in: UserCreate) -> User:
    try:
        db_user = User(
            email=user_in.email,
            username=user_in.username,
            hashed_password=get_password_hash(user_in.password),
            is_active=True,
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        
        stats = UserStats(
            user_id=db_user.id,
            streak=0,
            coins=5,
            heart=5,
            level=1,
            experience=1,
            experience_to_next_level=100
        )
        db.add(stats)
        db.commit()
        db.refresh(stats)
        
        return db_user
    except Exception as e:
        db.rollback()
        print(f"Error creating user: {str(e)}")
        print(f"Error type: {type(e)}")
        raise e

def authenticate_user(db: Session, credentials: dict) -> Optional[User]:
    username = credentials.get("username")
    password = credentials.get("password")

    if not username or not password:
        return None

    if is_email(username):
        user = get_user_by_email(db, username)
    else:
        user = get_user_by_username(db, username)

    if not user or not verify_password(password, user.hashed_password):
        return None

    return user

def is_email(text: str) -> bool:
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(email_pattern, text))

def setNewUser(db: Session, user: User) -> None:
    user.is_new_user = False
    db.commit()
    db.refresh(user)

def update_user_companion(db: Session, user: User, companion_name: str) -> User:
    user.selected_companion = companion_name
    db.commit()
    db.refresh(user)
    return user