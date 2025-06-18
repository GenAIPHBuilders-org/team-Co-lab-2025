from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies import get_db, get_current_user
from app.models.user_model import User
from app.schemas.daily_rewards_schema import DailyRewardsList
from app.services.daily_rewards_service import DailyRewardsService

router = APIRouter(tags=["daily_rewards"])

@router.get("/", response_model=DailyRewardsList)
async def get_daily_rewards(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> DailyRewardsList:
    """Get daily rewards with user's current streak and claim status"""
    daily_rewards_service = DailyRewardsService(db)
    
    # Initialize daily rewards if they don't exist
    daily_rewards_service.initialize_daily_rewards()
    
    return daily_rewards_service.get_daily_rewards(current_user.id)

@router.post("/claim")
async def claim_daily_reward(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    daily_rewards_service = DailyRewardsService(db)
    
    daily_rewards_service.initialize_daily_rewards()
    
    return daily_rewards_service.claim_daily_reward(current_user.id)

# @router.get("/test")
# async def test_daily_rewards(
#     db: Session = Depends(get_db)
# ):
#     """Test endpoint to check if daily rewards system is working"""
#     try:
#         daily_rewards_service = DailyRewardsService(db)
#         daily_rewards_service.initialize_daily_rewards()
        
#         # Check if rewards exist
#         from app.models.daily_rewards_model import DailyReward
#         rewards_count = db.query(DailyReward).count()
        
#         return {
#             "status": "success",
#             "message": "Daily rewards system is working",
#             "rewards_count": rewards_count,
#             "rewards": [
#                 {
#                     "day": reward.day,
#                     "icon": reward.icon,
#                     "reward": reward.description,
#                     "type": reward.reward_type
#                 }
#                 for reward in db.query(DailyReward).order_by(DailyReward.day).all()
#             ]
#         }
#     except Exception as e:
#         return {
#             "status": "error",
#             "message": f"Daily rewards system error: {str(e)}"
#         } 