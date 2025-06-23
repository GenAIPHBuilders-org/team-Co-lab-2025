from pydantic import BaseModel, Field
import uuid
from typing import List, Optional

class DailyRewardBase(BaseModel):
    day: int = Field(..., description="Day number (1-7)")
    icon: str = Field(..., description="Icon identifier")
    reward_amount: int = Field(..., description="Amount of reward")
    reward_type: str = Field(..., description="Type of reward: heart, coin, xp")
    description: str = Field(..., description="Human readable reward description")

class DailyRewardCreate(DailyRewardBase):
    pass

class DailyReward(DailyRewardBase):
    id: uuid.UUID

    class Config:
        from_attributes = True

class DailyRewardResponse(BaseModel):
    day: int
    icon: str
    reward: str
    type: str
    is_claimed: bool = False

class DailyRewardsList(BaseModel):
    rewards: List[DailyRewardResponse]
    current_streak: int
    can_claim: bool 