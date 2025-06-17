from sqlalchemy import Boolean, Column, Integer, String, DateTime
from sqlalchemy.sql import func
from pydantic import BaseModel
from app.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSON



class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    is_new_user = Column(Boolean, default=True)
    boss_wins = Column(Integer, default=0)
    boss_losses = Column(Integer, default=0)
    weak_topics = Column(JSON, default={})  # {"topic": mistake_count}

class LoginRequest(BaseModel):
    username: str
    password: str

class UserInfo(BaseModel):
    id: int
    email: str
    username: str
    is_active: bool
    is_new_user: bool
    selected_companion: str | None = None