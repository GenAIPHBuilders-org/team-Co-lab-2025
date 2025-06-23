from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from typing import List, Optional, Dict, Any
from uuid import UUID
from datetime import datetime
from app.models.topic_model import Topic
from app.models.user_topic_progress_model import UserTopicProgress
from app.models.user_stats_model import UserStats
from app.models.achievements_model import Achievement
from app.models.user_achievements_model import UserAchievements as UserAchievement
from app.schemas.topic_schema import TopicCreate, TopicResponse, UserTopicProgressResponse
from fastapi import HTTPException
import uuid

class TopicService:
    def __init__(self, db: Session):
        self.db = db

    def create_topic(self, topic_data: TopicCreate) -> Topic:
        """Create a new topic"""
        try:
            # Check if topic with same name already exists
            existing_topic = self.db.query(Topic).filter(Topic.name == topic_data.name).first()
            if existing_topic:
                raise HTTPException(status_code=400, detail="Topic with this name already exists")

            # Validate difficulty
            valid_difficulties = ["beginner", "intermediate", "advanced"]
            if topic_data.difficulty not in valid_difficulties:
                raise HTTPException(status_code=400, detail=f"Invalid difficulty. Must be one of: {valid_difficulties}")

            # Create new topic
            topic = Topic(
                name=topic_data.name,
                icon=topic_data.icon,
                color=topic_data.color,
                difficulty=topic_data.difficulty,
                description=topic_data.description,
                rewards=topic_data.rewards,
                min_level_required=topic_data.min_level_required
            )
            
            self.db.add(topic)
            self.db.commit()
            self.db.refresh(topic)
            
            return topic
            
        except HTTPException:
            raise
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail=f"Failed to create topic: {str(e)}")

    def get_topics(self, user_id: UUID, skip: int = 0, limit: int = 100) -> Dict[str, Any]:
        """Get all topics with user-specific information (locked status, progress)"""
        try:
            # Get user stats to determine level
            user_stats = self.db.query(UserStats).filter(UserStats.user_id == user_id).first()
            user_level = user_stats.level if user_stats else 0

            # Get all topics
            topics = self.db.query(Topic).offset(skip).limit(limit).all()
            
            # Get user progress for all topics
            user_progress = self.db.query(UserTopicProgress).filter(
                UserTopicProgress.user_id == user_id
            ).all()
            progress_dict = {str(p.topic_id): p for p in user_progress}

            # Build response with user-specific data
            topic_responses = []
            for topic in topics:
                progress = progress_dict.get(str(topic.id))
                
                # Determine if topic is locked based on user level
                locked = user_level < topic.min_level_required
                
                topic_response = TopicResponse(
                    id=topic.id,
                    name=topic.name,
                    icon=topic.icon,
                    color=topic.color,
                    difficulty=topic.difficulty,
                    description=topic.description,
                    rewards=topic.rewards,
                    min_level_required=topic.min_level_required,
                    created_at=topic.created_at,
                    updated_at=topic.updated_at,
                    locked=locked,
                    completion_percentage=progress.completion_percentage if progress else 0.0,
                    is_completed=progress.is_completed if progress else False
                )
                topic_responses.append(topic_response)

            return {
                "topics": topic_responses,
                "total": len(topic_responses)
            }
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to fetch topics: {str(e)}")

    def get_topic_by_id(self, topic_id: UUID, user_id: UUID) -> TopicResponse:
        """Get a specific topic with user progress"""
        try:
            topic = self.db.query(Topic).filter(Topic.id == topic_id).first()
            if not topic:
                raise HTTPException(status_code=404, detail="Topic not found")

            # Get user stats and progress
            user_stats = self.db.query(UserStats).filter(UserStats.user_id == user_id).first()
            user_level = user_stats.level if user_stats else 0
            
            progress = self.db.query(UserTopicProgress).filter(
                and_(
                    UserTopicProgress.user_id == user_id,
                    UserTopicProgress.topic_id == topic_id
                )
            ).first()

            locked = user_level < topic.min_level_required

            return TopicResponse(
                id=topic.id,
                name=topic.name,
                icon=topic.icon,
                color=topic.color,
                difficulty=topic.difficulty,
                description=topic.description,
                rewards=topic.rewards,
                min_level_required=topic.min_level_required,
                created_at=topic.created_at,
                updated_at=topic.updated_at,
                locked=locked,
                completion_percentage=progress.completion_percentage if progress else 0.0,
                is_completed=progress.is_completed if progress else False
            )
            
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to fetch topic: {str(e)}")

    def delete_topic(self, topic_id: UUID) -> Dict[str, str]:
        """Delete a topic"""
        try:
            topic = self.db.query(Topic).filter(Topic.id == topic_id).first()
            if not topic:
                raise HTTPException(status_code=404, detail="Topic not found")

            # Delete associated user progress first
            self.db.query(UserTopicProgress).filter(
                UserTopicProgress.topic_id == topic_id
            ).delete()

            # Delete the topic
            self.db.delete(topic)
            self.db.commit()
            
            return {"message": f"Topic '{topic.name}' deleted successfully"}
            
        except HTTPException:
            raise
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail=f"Failed to delete topic: {str(e)}")

    def start_topic(self, user_id: UUID, topic_id: UUID) -> UserTopicProgressResponse:
        """Start a topic for a user"""
        try:
            # Check if topic exists and user can access it
            topic = self.db.query(Topic).filter(Topic.id == topic_id).first()
            if not topic:
                raise HTTPException(status_code=404, detail="Topic not found")

            user_stats = self.db.query(UserStats).filter(UserStats.user_id == user_id).first()
            user_level = user_stats.level if user_stats else 0
            
            if user_level < topic.min_level_required:
                raise HTTPException(
                    status_code=403, 
                    detail=f"User level {user_level} is too low. Required level: {topic.min_level_required}"
                )

            # Check if user already has progress for this topic
            existing_progress = self.db.query(UserTopicProgress).filter(
                and_(
                    UserTopicProgress.user_id == user_id,
                    UserTopicProgress.topic_id == topic_id
                )
            ).first()

            if existing_progress:
                # Update last accessed time
                existing_progress.last_accessed = datetime.utcnow()
                self.db.commit()
                self.db.refresh(existing_progress)
                
                return UserTopicProgressResponse(
                    id=existing_progress.id,
                    topic_id=existing_progress.topic_id,
                    topic_name=topic.name,
                    is_completed=existing_progress.is_completed,
                    completion_percentage=existing_progress.completion_percentage,
                    started_at=existing_progress.started_at,
                    completed_at=existing_progress.completed_at,
                    last_accessed=existing_progress.last_accessed
                )

            # Create new progress entry
            progress = UserTopicProgress(
                user_id=user_id,
                topic_id=topic_id,
                completion_percentage=0.0,
                is_completed=False
            )
            
            self.db.add(progress)
            self.db.commit()
            self.db.refresh(progress)
            
            return UserTopicProgressResponse(
                id=progress.id,
                topic_id=progress.topic_id,
                topic_name=topic.name,
                is_completed=progress.is_completed,
                completion_percentage=progress.completion_percentage,
                started_at=progress.started_at,
                completed_at=progress.completed_at,
                last_accessed=progress.last_accessed
            )
            
        except HTTPException:
            raise
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail=f"Failed to start topic: {str(e)}")

    def update_topic_progress(self, user_id: UUID, topic_id: UUID, completion_percentage: float) -> UserTopicProgressResponse:
        """Update topic progress and handle completion rewards"""
        try:
            # Get topic and progress
            topic = self.db.query(Topic).filter(Topic.id == topic_id).first()
            if not topic:
                raise HTTPException(status_code=404, detail="Topic not found")

            progress = self.db.query(UserTopicProgress).filter(
                and_(
                    UserTopicProgress.user_id == user_id,
                    UserTopicProgress.topic_id == topic_id
                )
            ).first()

            if not progress:
                raise HTTPException(status_code=404, detail="Topic progress not found")

            was_completed = progress.is_completed
            progress.completion_percentage = completion_percentage
            progress.last_accessed = datetime.utcnow()

            # Check if topic is now completed
            if completion_percentage >= 100.0 and not was_completed:
                progress.is_completed = True
                progress.completed_at = datetime.utcnow()
                
                # Award rewards
                self._award_topic_completion_rewards(user_id, topic)

            self.db.commit()
            self.db.refresh(progress)
            
            return UserTopicProgressResponse(
                id=progress.id,
                topic_id=progress.topic_id,
                topic_name=topic.name,
                is_completed=progress.is_completed,
                completion_percentage=progress.completion_percentage,
                started_at=progress.started_at,
                completed_at=progress.completed_at,
                last_accessed=progress.last_accessed
            )
            
        except HTTPException:
            raise
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail=f"Failed to update topic progress: {str(e)}")

    def _award_topic_completion_rewards(self, user_id: UUID, topic: Topic):
        """Award rewards for completing a topic"""
        try:
            user_stats = self.db.query(UserStats).filter(UserStats.user_id == user_id).first()
            if not user_stats:
                return

            for reward in topic.rewards:
                if "coins" in reward.lower():
                    try:
                        coin_amount = int(''.join(filter(str.isdigit, reward)))
                        user_stats.coins += coin_amount
                    except ValueError:
                        pass
                
                elif "heart" in reward.lower() or "hearts" in reward.lower():
                    # Extract heart amount
                    try:
                        heart_amount = int(''.join(filter(str.isdigit, reward)))
                        user_stats.heart += heart_amount
                    except ValueError:
                        pass

                elif "xp" in reward.lower():
                    try:
                        xp_amount = int(''.join(filter(str.isdigit, reward)))
                        user_stats.experience += xp_amount
                        
                        while user_stats.experience >= user_stats.experience_to_next_level:
                            user_stats.experience -= user_stats.experience_to_next_level
                            user_stats.level += 1
                            user_stats.experience_to_next_level = int(user_stats.experience_to_next_level * 2)  # Increase XP needed for next level
                    except ValueError:
                        pass

                if "badge" in reward.lower():
                    self._create_topic_completion_achievement(user_id, topic, reward)

            self.db.commit()
            
        except Exception as e:
            print(f"Error awarding topic completion rewards: {str(e)}")

    def _create_topic_completion_achievement(self, user_id: UUID, topic: Topic, reward: str):
        try:
            # Check if achievement already exists
            existing_achievement = self.db.query(Achievement).filter(
                Achievement.achievement_title == f"{topic.name} Completion"
            ).first()

            if not existing_achievement:
                # Create new achievement
                achievement = Achievement(
                    achievement_title=f"{topic.name} Completion",
                    achievement_description=f"Successfully completed the {topic.name} topic",
                    achievement_icon="trophy",  # Default icon
                    achievement_criteria=1,
                    already_achieved=False
                )
                self.db.add(achievement)
                self.db.commit()
                self.db.refresh(achievement)
            else:
                achievement = existing_achievement

            # Check if user already has this achievement
            existing_user_achievement = self.db.query(UserAchievement).filter(
                and_(
                    UserAchievement.user_id == user_id,
                    UserAchievement.achievement_id == achievement.id
                )
            ).first()

            if not existing_user_achievement:
                # Award achievement to user
                user_achievement = UserAchievement(
                    user_id=user_id,
                    achievement_id=achievement.id,
                    achievement_progress=100  # Set to 100% for completed topics
                )
                self.db.add(user_achievement)
                self.db.commit()
                
        except Exception as e:
            print(f"Error creating topic completion achievement: {str(e)}")

    def get_user_topic_progress(self, user_id: UUID) -> List[UserTopicProgressResponse]:
        """Get all topic progress for a user"""
        try:
            progress_list = self.db.query(UserTopicProgress).filter(
                UserTopicProgress.user_id == user_id
            ).all()

            responses = []
            for progress in progress_list:
                topic = self.db.query(Topic).filter(Topic.id == progress.topic_id).first()
                if topic:
                    responses.append(UserTopicProgressResponse(
                        id=progress.id,
                        topic_id=progress.topic_id,
                        topic_name=topic.name,
                        is_completed=progress.is_completed,
                        completion_percentage=progress.completion_percentage,
                        started_at=progress.started_at,
                        completed_at=progress.completed_at,
                        last_accessed=progress.last_accessed
                    ))

            return responses
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to fetch user topic progress: {str(e)}") 

    def get_user_achievements(self, user_id: UUID) -> List[UserAchievement]:
        """Get all achievements for a user"""
        try:
            achievements = self.db.query(UserAchievement).filter(
                UserAchievement.user_id == user_id
            ).all()
            return achievements
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to fetch user achievements: {str(e)}")
        