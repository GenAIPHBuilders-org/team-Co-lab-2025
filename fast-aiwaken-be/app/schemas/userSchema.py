from typing import Optional
from pydantic import BaseModel, EmailStr
import uuid
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    username: str

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    password: Optional[str] = None

class User(UserBase):
    id: uuid.UUID
    is_active: bool
    is_new_user: bool
    created_at: datetime

    class Config:
        from_attributes = True

class TokenData(BaseModel):
    user_id: uuid.UUID