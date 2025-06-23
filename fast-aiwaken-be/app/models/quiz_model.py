from pydantic import BaseModel


class QuizHintRequest(BaseModel):
    quiz_question: str
    topic_title: str