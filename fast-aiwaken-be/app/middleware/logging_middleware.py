import logging
import time
from fastapi import Request
from fastapi.responses import Response
import json
from typing import Callable
import uuid

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class LoggingMiddleware:
    def __init__(self):
        self.logger = logger

    async def __call__(self, request: Request, call_next: Callable) -> Response:
        # Generate request ID
        request_id = str(uuid.uuid4())
        
        # Log request
        start_time = time.time()
        self.logger.info(f"Request ID: {request_id} - Method: {request.method} - Path: {request.url.path}")
        
        # Get request body if it exists
        try:
            body = await request.body()
            if body:
                self.logger.debug(f"Request ID: {request_id} - Body: {body.decode()}")
        except Exception as e:
            self.logger.error(f"Request ID: {request_id} - Error reading request body: {str(e)}")

        # Process request
        try:
            response = await call_next(request)
            
            # Calculate processing time
            process_time = time.time() - start_time
            
            # Log response
            self.logger.info(
                f"Request ID: {request_id} - Status: {response.status_code} - "
                f"Processing Time: {process_time:.2f}s"
            )
            
            return response
            
        except Exception as e:
            # Log error
            self.logger.error(
                f"Request ID: {request_id} - Error: {str(e)} - "
                f"Processing Time: {time.time() - start_time:.2f}s"
            )
            raise 