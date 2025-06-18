from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base
import uuid

class UserStats(Base):
    __tablename__ = "user_stats"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    streak = Column(Integer, nullable=False, default=0)
    coins = Column(Integer, nullable=False, default=0)
    heart = Column(Integer, nullable=False, default=0)
    level = Column(Integer, nullable=False, default=0)
    experience = Column(Integer, nullable=False, default=0)
    experience_to_next_level = Column(Integer, nullable=False, default=100)
    last_check_in = Column(DateTime(timezone=True), nullable=True, default=None)
    user = relationship("User", back_populates="stats")