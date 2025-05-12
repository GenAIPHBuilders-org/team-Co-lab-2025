from typing import Optional
from sqlalchemy.orm import Session
import re
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
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

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

def is_email(value: str) -> bool:
    return re.match(r"[^@]+@[^@]+\.[^@]+", value) is not None

def setNewUser(db: Session, user: User) -> None:
    user.is_new_user = False
    db.commit()
    db.refresh(user)