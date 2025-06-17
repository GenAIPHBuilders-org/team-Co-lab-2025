from fastapi import Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from sqlalchemy.exc import SQLAlchemyError
from typing import Union
import logging

logger = logging.getLogger(__name__)

class ErrorHandler:
    async def __call__(self, request: Request, call_next):
        try:
            return await call_next(request)
        except Exception as e:
            return await self.handle_exception(e)

    async def handle_exception(self, exc: Exception) -> JSONResponse:
        if isinstance(exc, RequestValidationError):
            return JSONResponse(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                content={
                    "detail": "Validation error",
                    "errors": exc.errors()
                }
            )
        
        elif isinstance(exc, SQLAlchemyError):
            logger.error(f"Database error: {str(exc)}")
            return JSONResponse(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                content={
                    "detail": "Database error occurred",
                    "message": "An unexpected database error occurred"
                }
            )
        
        elif hasattr(exc, "status_code"):
            # Handle FastAPI HTTPException
            return JSONResponse(
                status_code=exc.status_code,
                content={"detail": str(exc.detail)}
            )
        
        else:
            # Handle unexpected errors
            logger.error(f"Unexpected error: {str(exc)}")
            return JSONResponse(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                content={
                    "detail": "Internal server error",
                    "message": "An unexpected error occurred"
                }
            ) 