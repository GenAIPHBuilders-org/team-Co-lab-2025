from pydantic import Field
from pydantic_settings import BaseSettings
from pydantic import field_validator  # Import the new validator decorator

class Settings(BaseSettings):
    USE_SQLITE_FALLBACK: bool = Field(False, env="USE_SQLITE_FALLBACK")

    PROJECT_NAME: str = "aiwaken_api"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = Field(..., env="SECRET_KEY")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(..., env="ACCESS_TOKEN_EXPIRE_MINUTES")
    REFRESH_TOKEN_EXPIRE_DAYS: int = Field(..., env="REFRESH_TOKEN_EXPIRE_DAYS")

    POSTGRES_USER: str = Field(..., env="POSTGRES_USER")
    POSTGRES_PASSWORD: str = Field(..., env="POSTGRES_PASSWORD")
    POSTGRES_HOST: str = Field(..., env="POSTGRES_HOST")
    POSTGRES_PORT: int = Field(..., env="POSTGRES_PORT")
    POSTGRES_DB: str = Field(..., env="POSTGRES_DB")

    # Gemini API Key
    GEMINI_API_KEY: str = Field(..., env="GEMINI_API_KEY") 

    # Gemini url
    GEMINI_BASE_URL: str = Field("https://api.gemini.com", env="GEMINI_BASE_URL")

    # Youtube API Key
    YOUTUBE_API_KEY: str = Field(..., env="YOUTUBE_API_KEY")

    DATABASE_URL: str | None = Field(None, env="DATABASE_URL")

    @field_validator("DATABASE_URL", mode="before")
    @classmethod
    def assemble_db_url(cls, v: str | None, values: dict) -> str:
        # if you've explicitly set DATABASE_URL in .env, just use it
        if isinstance(v, str) and v:
            return v

        user = values.data["POSTGRES_USER"]
        pwd = values.data["POSTGRES_PASSWORD"]
        host = values.data["POSTGRES_HOST"]
        port = values.data["POSTGRES_PORT"]
        db = values.data["POSTGRES_DB"]
        # build the URL manually
        return f"postgresql://{user}:{pwd}@{host}:{port}/{db}"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()