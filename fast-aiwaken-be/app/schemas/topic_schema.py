from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from uuid import UUID

class TopicCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100, description="Topic name")
    icon: str = Field(..., description="Icon identifier")
    color: str = Field(..., description="CSS color classes")
    difficulty: str = Field(..., description="Difficulty level: beginner, intermediate, advanced")
    description: str = Field(..., min_length=10, max_length=500, description="Topic description")
    rewards: List[str] = Field(..., description="List of rewards")
    min_level_required: int = Field(1, ge=1, le=100, description="Minimum user level required")

class TopicResponse(BaseModel):
    id: UUID
    name: str
    icon: str
    color: str
    difficulty: str
    description: str
    rewards: List[str]
    min_level_required: int
    created_at: datetime
    updated_at: datetime
    locked: bool = False  # Will be calculated based on user level
    completion_percentage: Optional[float] = None
    is_completed: Optional[bool] = None

    class Config:
        from_attributes = True
        extra = "ignore"  # Ignore extra fields that might be present

class TopicListResponse(BaseModel):
    topics: List[TopicResponse]
    total: int

class UserTopicProgressResponse(BaseModel):
    id: UUID
    topic_id: UUID
    topic_name: str
    is_completed: bool
    completion_percentage: float
    started_at: datetime
    completed_at: Optional[datetime]
    last_accessed: datetime

    class Config:
        from_attributes = True

class TopicCompletionRequest(BaseModel):
    topic_id: UUID
    completion_percentage: float = Field(..., ge=0.0, le=100.0) 