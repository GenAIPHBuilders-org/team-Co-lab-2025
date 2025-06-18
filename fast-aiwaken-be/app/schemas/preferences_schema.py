from pydantic import BaseModel, Field
from typing import Optional
import uuid

class PreferencesBase(BaseModel):
    age_range: Optional[str] = Field(None, description="User's preferred age range")
    motivation_level: Optional[str] = Field(None, description="User's motivation level")
    learning_goal: Optional[str] = Field(None, description="User's learning goal")
    explanation_depth: Optional[str] = Field(None, description="Preferred depth of explanations")
    companion: Optional[str] = Field(None, description="Preferred companion")
    learning_style: Optional[str] = Field(None, description="User's learning style")

class PreferencesCreate(PreferencesBase):
    pass

class PreferencesUpdate(PreferencesBase):
    pass

class PreferencesInDB(PreferencesBase):
    id: uuid.UUID
    user_id: uuid.UUID

    class Config:
        from_attributes = True

class Preferences(PreferencesBase):
    id: uuid.UUID
    user_id: uuid.UUID

    class Config:
        from_attributes = True 