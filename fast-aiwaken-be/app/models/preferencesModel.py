from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base
import uuid

class UserPreferences(Base):
    __tablename__ = "user_preferences"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    age_range = Column(String, nullable=True)
    motivation_level = Column(String, nullable=True)
    learning_goal = Column(String, nullable=True)
    explanation_depth = Column(String, nullable=True)
    companion = Column(String, nullable=True)
    learning_style = Column(String, nullable=True)
    
    user = relationship("User", back_populates="preferences") 