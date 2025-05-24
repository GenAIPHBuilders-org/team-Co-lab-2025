
from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from app.models.userModel import UserInfo

class TokenizedUser(BaseModel):
    user: UserInfo
    access_token: str
    token_type: str

class TokenPayload(BaseModel):
    sub: str
    exp: datetime
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[int] = None