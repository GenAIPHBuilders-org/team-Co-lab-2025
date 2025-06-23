from pydantic import BaseModel
from uuid import UUID

class UserAchievementResponse(BaseModel):
    id: UUID
    user_id: UUID
    achievement_id: UUID
    achievement_progress: int

    class Config:
        from_attributes = True

class UserAchievementWithDetails(BaseModel):
    id: UUID
    user_id: UUID
    achievement_id: UUID
    achievement_progress: int
    achievement_title: str
    achievement_description: str
    achievement_icon: str

    class Config:
        from_attributes = True 