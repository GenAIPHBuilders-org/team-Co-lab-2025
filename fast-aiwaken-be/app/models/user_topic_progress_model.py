from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, Float
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base
import uuid
from datetime import datetime

class UserTopicProgress(Base):
    __tablename__ = "user_topic_progress"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    topic_id = Column(UUID(as_uuid=True), ForeignKey("topics.id", ondelete="CASCADE"), nullable=False)
    is_completed = Column(Boolean, nullable=False, default=False)
    completion_percentage = Column(Float, nullable=False, default=0.0)
    started_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    last_accessed = Column(DateTime(timezone=True), default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="topic_progress")
    topic = relationship("Topic", back_populates="user_progress") 