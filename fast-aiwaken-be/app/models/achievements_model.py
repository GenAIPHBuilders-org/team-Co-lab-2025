from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base
from sqlalchemy.orm import relationship
import uuid

class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    achievement_title = Column(String, nullable=False)
    achievement_description = Column(Text, nullable=False)
    achievement_icon = Column(String, nullable=False)
    achievement_criteria = Column(Integer, nullable=False)
    already_achieved = Column(Boolean, nullable=False, default=False)
    
    # Relationship to UserAchievements
    user_achievements = relationship("UserAchievements", back_populates="achievement")