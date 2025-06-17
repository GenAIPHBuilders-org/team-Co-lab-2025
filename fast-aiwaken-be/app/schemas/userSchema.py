from typing import Optional, Dict  
from pydantic import BaseModel, EmailStr, Field

class UserBase(BaseModel):
    email: EmailStr
    username: str
    is_active: bool = True

class UserCreate(BaseModel):
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=8)

class UserInDB(UserBase):
    id: int
    hashed_password: str

    class Config:
        from_attributes = True

class User(UserBase):
    id: int
    is_new_user: bool
    selected_companion: Optional[str] = None
    boss_wins: int = 0
    boss_losses: int = 0
    weak_topics: Dict[str, int] = Field(default_factory=dict)

    class Config:
        from_attributes = True

class CompanionSelection(BaseModel):
    companion_name: str = Field(..., description="Name of the selected companion")