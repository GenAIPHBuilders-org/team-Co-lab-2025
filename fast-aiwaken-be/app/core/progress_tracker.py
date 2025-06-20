import redis
import json
from typing import List
from datetime import datetime, timedelta

class ProgressTracker:
    def __init__(self, course_id: str, redis_client=None):
        self.course_id = course_id
        self.redis_client = redis_client or redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)
        self.weak_topics_key = f"progress:{self.course_id}:weak_topics"
        self.last_updated_key = f"progress:{self.course_id}:last_updated"
        self.expiration_days = 30

    def update_weak_topic(self, topic: str, count: int = 1):
        self.redis_client.hincrby(self.weak_topics_key, topic, count)
        self.redis_client.set(self.last_updated_key, datetime.now().isoformat())
        self.redis_client.expire(self.weak_topics_key, self.expiration_days * 24 * 3600)
        self.redis_client.expire(self.last_updated_key, self.expiration_days * 24 * 3600)

    def get_top_weak_topics(self, n=3) -> List[str]:
        last_updated = self.redis_client.get(self.last_updated_key)
        if last_updated:
            last_updated_dt = datetime.fromisoformat(last_updated)
            if datetime.now() > last_updated_dt + timedelta(days=self.expiration_days):
                self.redis_client.delete(self.weak_topics_key)
                self.redis_client.delete(self.last_updated_key)
                return []
        weak_topics = self.redis_client.hgetall(self.weak_topics_key)
        sorted_topics = sorted(weak_topics.items(), key=lambda x: int(x[1]), reverse=True)
        return sorted_topics[:n] if n else sorted_topics 