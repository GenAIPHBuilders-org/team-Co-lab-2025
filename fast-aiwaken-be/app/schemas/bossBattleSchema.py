from typing import Dict, Any
from pydantic import BaseModel, field_validator
import uuid
from pyparsing import Any


class BossSubmission(BaseModel):
    course_id: uuid.UUID
    user_answers: Dict[str, str]  # {question_id: user_answer}
    quiz_data: Dict[str, Any]     # Full quiz JSON from initial boss battle

    @field_validator('course_id')
    def validate_course_id(cls, v):
        if isinstance(v, uuid.UUID):
            return v
        try:
            return uuid.UUID(str(v))
        except Exception:
            raise ValueError('course_id must be a valid UUID')

class AdaptiveQuizRequest(BaseModel):
    course_id: uuid.UUID
    subject: str
    difficulty: str
    enemy_theme: str

    @field_validator('course_id')
    def validate_course_id(cls, v):
        if isinstance(v, uuid.UUID):
            return v
        try:
            return uuid.UUID(str(v))
        except Exception:
            raise ValueError('course_id must be a valid UUID')