from pydantic import BaseModel, Field

class CompanionSelection(BaseModel):
    companion_name: str = Field(..., description="Name of the selected companion") 