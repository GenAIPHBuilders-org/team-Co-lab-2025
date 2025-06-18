from pydantic import BaseModel, Field
import uuid
from datetime import datetime
from typing import Optional

class UserStatsBase(BaseModel):
    streak: int = Field(default=0)
    coins: int = Field(default=0)
    heart: int = Field(default=0)
    level: int = Field(default=0)
    experience: int = Field(default=0)
    experience_to_next_level: int = Field(default=100)
    last_check_in: Optional[datetime] = Field(default=None)

class UserStatsUpdate(UserStatsBase):
    streak: int = Field(default=0)
    coins: int = Field(default=0)
    heart: int = Field(default=0)
    level: int = Field(default=0)
    experience: int = Field(default=0)
    experience_to_next_level: int = Field(default=100)
    last_check_in: Optional[datetime] = Field(default=None)

class UserStatsInDB(UserStatsBase):
    id: uuid.UUID
    user_id: uuid.UUID

    class Config:
        from_attributes = True

class UserStats(UserStatsBase):
    id: uuid.UUID
    user_id: uuid.UUID

    class Config:
        from_attributes = True

