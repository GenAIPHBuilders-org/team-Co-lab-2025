from sqlalchemy import Column, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base
import uuid
from sqlalchemy.orm import relationship

class UserAchievements(Base):
    __tablename__ = "user_achievements"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    achievement_id = Column(UUID(as_uuid=True), ForeignKey("achievements.id", ondelete="CASCADE"), nullable=False)
    achievement_progress = Column(Integer, nullable=False, default=0)
    
    # Relationships
    user = relationship("User", back_populates="achievements")
    achievement = relationship("Achievement", back_populates="user_achievements")