from pydantic import BaseModel

class CourseStructureRequest(BaseModel):
    subject: str
    difficulty: str