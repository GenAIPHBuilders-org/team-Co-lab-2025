from typing import Dict
from pydantic import BaseModel
from pyparsing import Any


class BossSubmission(BaseModel):
    course_id: str
    user_answers: Dict[str, str]  # {question_id: user_answer}
    quiz_data: Dict[str, Any]     # Full quiz JSON from initial boss battle

class AdaptiveQuizRequest(BaseModel):
    course_id: str
    subject: str
    difficulty: str
    enemy_theme: str