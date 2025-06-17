from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from app.models.userModel import UserInfo
from app.schemas.preferencesSchema import Preferences
import uuid

class TokenizedUser(BaseModel):
    user: UserInfo
    access_token: str
    token_type: str
    preferences: Optional[Preferences] = None
    

class TokenPayload(BaseModel):
    sub: str
    exp: datetime
    token_type: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[uuid.UUID] = None