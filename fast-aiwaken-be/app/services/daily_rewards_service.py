from sqlalchemy.orm import Session
from app.models.daily_rewards_model import DailyReward
from app.models.user_stats_model import UserStats
from app.schemas.daily_rewards_schema import DailyRewardResponse, DailyRewardsList
from fastapi import HTTPException
import uuid
from datetime import datetime

class DailyRewardsService:
    def __init__(self, db: Session):
        self.db = db

    def get_daily_rewards(self, user_id: uuid.UUID) -> DailyRewardsList:

        user_stats = self.db.query(UserStats).filter(UserStats.user_id == user_id).first()
        if not user_stats:
            raise HTTPException(status_code=404, detail="User stats not found")

        daily_rewards = self.db.query(DailyReward).order_by(DailyReward.day).all()
        
        can_claim = self._can_claim_today(user_stats)
        
        rewards_response = []
        for reward in daily_rewards:
            is_claimed = self._is_reward_claimed(user_stats, reward.day)
            rewards_response.append(DailyRewardResponse(
                day=reward.day,
                icon=reward.icon,
                reward=reward.description,
                type=reward.reward_type,
                is_claimed=is_claimed
            ))

        return DailyRewardsList(
            rewards=rewards_response,
            current_streak=user_stats.streak,
            can_claim=can_claim
        )

    def claim_daily_reward(self, user_id: uuid.UUID) -> dict:
        user_stats = self.db.query(UserStats).filter(UserStats.user_id == user_id).first()
        if not user_stats:
            raise HTTPException(status_code=404, detail="User stats not found")

        if not self._can_claim_today(user_stats):
            raise HTTPException(status_code=400, detail="Already claimed today or streak broken")

        current_day = (user_stats.streak % 7) + 1
        daily_reward = self.db.query(DailyReward).filter(DailyReward.day == current_day).first()
        
        if not daily_reward:
            raise HTTPException(status_code=404, detail="Daily reward not found")

        reward_applied = self._apply_reward(user_stats, daily_reward)
        
        user_stats.streak += 1
        user_stats.last_check_in = datetime.utcnow()
        
        try:
            self.db.commit()
            self.db.refresh(user_stats)
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail=f"Failed to claim reward: {str(e)}")

        return {
            "message": "Daily reward claimed successfully",
            "reward": daily_reward.description,
            "new_streak": user_stats.streak,
            "reward_applied": reward_applied
        }

    def _can_claim_today(self, user_stats: UserStats) -> bool:
        if not user_stats.last_check_in:
            return True
        
        today = datetime.utcnow().date()
        last_check_in_date = user_stats.last_check_in.date()
        
        return last_check_in_date < today

    def _is_reward_claimed(self, user_stats: UserStats, day: int) -> bool:
        if user_stats.streak == 0:
            return False
        
        claimed_days = []
        for i in range(1, user_stats.streak + 1):
            claimed_day = ((i - 1) % 7) + 1
            if claimed_day not in claimed_days:
                claimed_days.append(claimed_day)
        
        return day in claimed_days

    def _apply_reward(self, user_stats: UserStats, daily_reward: DailyReward) -> dict:
        reward_applied = {}
        
        if daily_reward.reward_type == "heart":
            user_stats.heart += daily_reward.reward_amount
            reward_applied["hearts_added"] = daily_reward.reward_amount
        elif daily_reward.reward_type == "coin":
            user_stats.coins += daily_reward.reward_amount
            reward_applied["coins_added"] = daily_reward.reward_amount
        elif daily_reward.reward_type == "xp":
            user_stats.experience += daily_reward.reward_amount
            reward_applied["xp_added"] = daily_reward.reward_amount
            
            if user_stats.experience >= user_stats.experience_to_next_level:
                user_stats.level += 1
                user_stats.experience -= user_stats.experience_to_next_level
                user_stats.experience_to_next_level = self._calculate_next_level_exp(user_stats.level)
                reward_applied["level_up"] = True
                reward_applied["new_level"] = user_stats.level

        return reward_applied

    def _calculate_next_level_exp(self, level: int) -> int:
        return 100 * level
    def initialize_daily_rewards(self):
        try:
            existing_rewards = self.db.query(DailyReward).count()
            if existing_rewards > 0:
                return

            default_rewards = [
                {"day": 1, "icon": "heart", "reward_amount": 1, "reward_type": "heart", "description": "+1 Heart"},
                {"day": 2, "icon": "coins", "reward_amount": 10, "reward_type": "coin", "description": "+10 Coins"},
                {"day": 3, "icon": "star", "reward_amount": 10, "reward_type": "xp", "description": "+10 XP"},
                {"day": 4, "icon": "heart", "reward_amount": 2, "reward_type": "heart", "description": "+2 Hearts"},
                {"day": 5, "icon": "coins", "reward_amount": 30, "reward_type": "coin", "description": "+20 Coins"},
                {"day": 6, "icon": "star", "reward_amount": 25, "reward_type": "xp", "description": "+25 XP"},
                {"day": 7, "icon": "coins", "reward_amount": 50, "reward_type": "coin", "description": "+50 Coins"},
            ]

            for reward_data in default_rewards:
                reward = DailyReward(**reward_data)
                self.db.add(reward)

            self.db.commit()
        except Exception as e:
            self.db.rollback()
            print(f"Warning: Could not initialize daily rewards: {str(e)}")

