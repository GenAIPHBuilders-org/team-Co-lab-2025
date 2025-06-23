from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, JSON
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime

class Topic(Base):
    __tablename__ = "topics"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False, unique=True)
    icon = Column(String, nullable=False)  # Icon name/identifier
    color = Column(String, nullable=False)  # CSS color classes
    difficulty = Column(String, nullable=False)  # beginner, intermediate, advanced
    description = Column(Text, nullable=False)
    rewards = Column(JSON, nullable=False)  # Array of reward strings
    min_level_required = Column(Integer, nullable=False, default=1)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship to UserTopicProgress
    user_progress = relationship("UserTopicProgress", back_populates="topic") 