from typing import Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.preferencesModel import UserPreferences
from app.schemas.preferencesSchema import PreferencesCreate, PreferencesUpdate
import uuid
from app.models.userModel import User

class PreferencesService:
    def __init__(self, db: Session):
        self.db = db

    async def get_user_preferences(self, user_id: uuid.UUID) -> Optional[UserPreferences]:
        preferences = self.db.query(UserPreferences).filter(UserPreferences.user_id == user_id).first()
        if not preferences:
            raise HTTPException(status_code=404, detail="User preferences not found")
        return preferences

    async def create_user_preferences(
        self,
        user_id: uuid.UUID,
        user: User,
        preferences: PreferencesCreate
    ) -> UserPreferences:
        existing_preferences = self.db.query(UserPreferences).filter(
            UserPreferences.user_id == user_id
        ).first()
        
        if existing_preferences:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User preferences already exist"
            )
        
        db_preferences = UserPreferences(
            user_id=user_id,
            **preferences.dict()
        )
        
        try:
            self.db.add(db_preferences)
            user.is_new_user = False
            self.db.commit()
            self.db.refresh(user)
            self.db.refresh(db_preferences)
            return db_preferences
        except Exception as e:
            self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to create user preferences: {str(e)}"
            )

    async def update_user_preferences(
        self,
        user_id: uuid.UUID,
        preferences: PreferencesUpdate
    ) -> UserPreferences:
        db_preferences = self.db.query(UserPreferences).filter(
            UserPreferences.user_id == user_id
        ).first()
        
        if not db_preferences:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User preferences not found"
            )
        
        update_data = preferences.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_preferences, key, value)
        
        try:
            self.db.commit()
            self.db.refresh(db_preferences)
            return db_preferences
        except Exception as e:
            self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to update user preferences: {str(e)}"
            )

    async def delete_user_preferences(self, user_id: uuid.UUID) -> None:
        db_preferences = self.db.query(UserPreferences).filter(UserPreferences.user_id == user_id).first()
        if not db_preferences:
            raise HTTPException(status_code=404, detail="User preferences not found")
        self.db.delete(db_preferences)
        try:
            self.db.commit()
        except Exception:
            self.db.rollback()
            raise HTTPException(status_code=500, detail="Failed to delete preferences")