
from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenPayload(BaseModel):
    sub: str
    exp: datetime
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[int] = None