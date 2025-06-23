from typing import Optional
from pydantic import BaseModel, EmailStr
import uuid
from datetime import datetime
from app.schemas.user_stats_schema import UserStats

class UserBase(BaseModel):
    email: EmailStr
    username: str

class UserCreate(UserBase):
    password: str
    stats: Optional[UserStats] = None

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    password: Optional[str] = None

class User(UserBase):
    id: uuid.UUID
    is_active: bool
    is_new_user: bool
    created_at: datetime
    stats: Optional[UserStats] = None

    class Config:
        from_attributes = True

class TokenData(BaseModel):
    user_id: uuid.UUID