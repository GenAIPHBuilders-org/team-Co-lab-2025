import redis
import json
from typing import Dict, Any


# redis client
redis_client = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)

#  store the data
def store_in_redis(key:str, value: Dict[str, Any], ttl: int =-1):
    if value is None:
        print(f"Skipping storing None value for key: {key}")
        return
        
    if ttl == -1:
        redis_client.set(key, json.dumps(value))
    else:
        redis_client.setex(key, ttl, json.dumps(value))

# retrieve the data
def get_from_redis(key: str) -> Dict[str, Any]:
    value = redis_client.get(key)
    return json.loads(value) if value else None 