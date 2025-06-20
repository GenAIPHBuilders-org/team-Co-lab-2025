import json
import os
import redis
from typing import List, Dict, Any, Callable, Optional
from datetime import datetime, timedelta

class RAGMemory:
    class ProgressTracker:
        def __init__(self, course_id: str):
            self.course_id = course_id
            self.weak_topics = {}  # {topic: mistake_count}
            self.last_updated = datetime.now()
            self.expiration_days = 30
            
        def update_weak_topic(self, topic: str, count: int = 1):
            self.weak_topics[topic] = self.weak_topics.get(topic, 0) + count
            self.last_updated = datetime.now()
            
        def get_top_weak_topics(self, n=3) -> List[str]:
            # Clean expired data
            if datetime.now() > self.last_updated + timedelta(days=self.expiration_days):
                self.weak_topics = {}
                return []
                
            return sorted(self.weak_topics.items(), 
                        key=lambda x: x[1], 
                        reverse=True)[:n]


    def __init__(self, json_path: str = "memory_storage/companion_memory.json"):
        self.memory: List[Dict[str, Any]] = []
        self.json_path = json_path
        self._ensure_folder_exists()
        self.load_from_json()
        self.progress_trackers = {}  # {course_id: ProgressTracker}


    # enusre the folder for the memory file exists
    def _ensure_folder_exists(self):

        folder_path = os.path.dirname(self.json_path)
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)

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
        if course_id not in self.progress_trackers:
            self.progress_trackers[course_id] = ProgressTracker(course_id)
        return self.progress_trackers[course_id]
    