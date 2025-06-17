from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
import time
from collections import defaultdict
import asyncio
from typing import Dict, Tuple
import uuid

class RateLimiter:
    def __init__(self, requests_per_minute: int = 60):
        self.requests_per_minute = requests_per_minute
        self.requests: Dict[str, list] = defaultdict(list)
        self.lock = asyncio.Lock()

    async def check_rate_limit(self, request: Request) -> None:
        # Get client IP or user ID
        client_id = str(request.client.host)
        if hasattr(request.state, "user"):
            client_id = str(request.state.user.id)

        async with self.lock:
            current_time = time.time()
            # Remove requests older than 1 minute
            self.requests[client_id] = [
                req_time for req_time in self.requests[client_id]
                if current_time - req_time < 60
            ]

            # Check if rate limit is exceeded
            if len(self.requests[client_id]) >= self.requests_per_minute:
                raise HTTPException(
                    status_code=429,
                    detail="Too many requests. Please try again later."
                )

            # Add current request
            self.requests[client_id].append(current_time)

    async def __call__(self, request: Request, call_next):
        try:
            await self.check_rate_limit(request)
            response = await call_next(request)
            return response
        except HTTPException as e:
            return JSONResponse(
                status_code=e.status_code,
                content={"detail": e.detail}
            ) 