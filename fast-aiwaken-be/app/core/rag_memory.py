import json
import os
import redis
from typing import List, Dict, Any, Callable, Optional
from app.core.progress_tracker import ProgressTracker

class RAGMemory:

    def __init__(self):
        self.redis_client = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)

    # add a new entry to memory
    def add_to_memory(self, entry: Dict[str, Any]):
        key = f"rag:{entry.get('subject', '').lower()}:{entry.get('difficulty', '').lower()}:{entry.get('step_title', '').replace(' ', '_').lower()}"
        sanitized_entry = {k: (json.dumps(v) if isinstance(v, (dict, list)) else v) for k, v in entry.items() if v is not None}
        
        if not sanitized_entry:
            print(f"skip empty entry for key {key}")
            return      
        self.redis_client.hmset(key, mapping=sanitized_entry)
        print(f"Added entry to memory with key: {key}")

    # retrieve from rag
    def retrieve(self, filter_fn: Optional[Callable[[Dict[str, Any]], bool]] = None, max_items: int = 5) -> List[Dict[str, Any]]:
        keys = self.redis_client.keys("rag:*")
        entries = []
        for key in keys:
            entry = {k: json.loads(v) if v.startswith('{') or v.startswith('[') else v for k, v in self.redis_client.hgetall(key).items()}
            if not filter_fn or filter_fn(entry):
                entries.append(entry)
            if len(entries) >= max_items:
                break
        return entries

    # clear all memory
    def clear_memory(self):
        keys = self.redis_client.keys("rag:*")
        for key in keys:
            self.redis_client.delete(key)
        print("Cleared all memory entries.")

    def get_progress_tracker(self, course_id: str) -> ProgressTracker:
        return ProgressTracker(course_id, redis_client=self.redis_client)
    