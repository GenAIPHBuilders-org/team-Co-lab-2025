from sqlalchemy import Boolean, Column, Integer, String, DateTime
from sqlalchemy.sql import func
from pydantic import BaseModel
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class LoginRequest(BaseModel):
    username: str
    password: str

class UserInfo(BaseModel):
    id: int
    email: str
    username: str
    is_active: bool