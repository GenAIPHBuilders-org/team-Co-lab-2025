from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base
import uuid

class DailyReward(Base):
    __tablename__ = "daily_rewards"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    day = Column(Integer, nullable=False, unique=True)
    icon = Column(String, nullable=False)
    reward_amount = Column(Integer, nullable=False)
    reward_type = Column(String, nullable=False)  # "heart", "coin", "xp"
    description = Column(Text, nullable=False)
