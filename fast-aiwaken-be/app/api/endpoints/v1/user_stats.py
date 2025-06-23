from fastapi import APIRouter
from app.schemas.user_stats_schema import UserStats
from app.services.stats_service import StatsService
from app.dependencies import get_db
from sqlalchemy.orm import Session
from fastapi import Depends
import uuid

router = APIRouter(tags=["user_stats"])

@router.get("/", response_model=UserStats)
async def get_user_stats(user_id: uuid.UUID, db: Session = Depends(get_db)):
    return await StatsService(db).get_user_stats(user_id)

