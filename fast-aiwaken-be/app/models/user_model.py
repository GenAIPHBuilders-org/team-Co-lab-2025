from sqlalchemy import Boolean, Column, String, DateTime
from sqlalchemy.sql import func
from pydantic import BaseModel
from app.database import Base
from sqlalchemy.orm import relationship
import uuid
from sqlalchemy.dialects.postgresql import UUID

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    is_new_user = Column(Boolean, default=True)
    preferences = relationship("UserPreferences", back_populates="user", uselist=False)
    stats = relationship("UserStats", back_populates="user", uselist=False)

class LoginRequest(BaseModel):
    username: str
    password: str

class UserInfo(BaseModel):
    id: uuid.UUID
    email: str
    username: str
    is_active: bool
    is_new_user: bool
    selected_companion: str | None = None