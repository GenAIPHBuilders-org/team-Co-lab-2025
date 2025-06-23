from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from app.models.user_model import UserInfo
from app.schemas.preferences_schema import Preferences
import uuid
from app.schemas.user_stats_schema import UserStats

class TokenizedUser(BaseModel):
    user: UserInfo
    access_token: str
    token_type: str
    preferences: Optional[Preferences] = None
    stats: Optional[UserStats] = None

class TokenPayload(BaseModel):
    sub: str
    exp: datetime
    token_type: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[uuid.UUID] = None