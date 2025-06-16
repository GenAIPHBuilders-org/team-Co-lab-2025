import json
from typing import List, Dict, Any, Callable, Optional
import os

class RAGMemory:
    def __init__(self, json_path: str = "memory_storage/companion_memory.json"):
        self.memory: List[Dict[str, Any]] = []
        self.json_path = json_path
        self._ensure_folder_exists()
        self.load_from_json()

    # enusre the folder for the memory file exists
    def _ensure_folder_exists(self):

        folder_path = os.path.dirname(self.json_path)
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)

    # add a new entry to memory
    def add(self, entry: Dict[str, Any]):
        self.memory.append(entry)
        self.save_to_json()

    # retrieve the last n items from memory
    def retrieve(self, filter_fn: Optional[Callable[[Dict[str, Any]], bool]] = None, max_items: int = 5) -> List[Dict[str, Any]]:
        if filter_fn:
            relevant = list(filter(filter_fn, self.memory))
        else:
            relevant = self.memory
        return relevant[-max_items:]

    # save the memory to a json file
    def save_to_json(self):

        # debugging
        print(f"Saving memory to {self.json_path} with {len(self.memory)}")
        with open(self.json_path, "w", encoding="utf-8") as f:
            json.dump(self.memory, f, ensure_ascii=False, indent=2)

    # load the memory from a json file
    def load_from_json(self):
        try:
            with open(self.json_path, "r", encoding="utf-8") as f:
                self.memory = json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            self.memory = []