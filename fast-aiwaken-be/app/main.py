from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import auth
from app.config import settings
from app.database import Base, engine
from app.api.endpoints import companion_interaction

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs", 
    redoc_url="/redoc",  
)

# Set up CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://127.0.0.1:3000",  # ADD THIS
    "http://127.0.0.1:8000", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/authentication", tags=["auth"])

@app.get("/")
def root():
    return {"message": "Authentication API"}


# companion interaction router
app.include_router(companion_interaction.router, prefix="/api/v1/companion")