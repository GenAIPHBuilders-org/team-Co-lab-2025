from sqlalchemy.orm import Session
from app.models.user_stats_model import UserStats
import uuid
from fastapi import HTTPException
from typing import Optional

class StatsService:
    def __init__(self, db: Session):
        self.db = db

    def get_user_stats(self, user_id: uuid.UUID) -> Optional[UserStats]:
        stats = self.db.query(UserStats).filter(UserStats.user_id == user_id).first()
        if not stats:
            raise HTTPException(status_code=404, detail="User stats not found")
        return stats