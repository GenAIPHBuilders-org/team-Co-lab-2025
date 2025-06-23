from typing import List, Dict, Any

INITIAL_TOPICS = [
    {
        "name": "Mathematics",
        "icon": "Calculator",
        "color": "bg-orange-100 text-orange-600",
        "difficulty": "beginner",
        "description": "Master the fundamentals of mathematics including arithmetic, algebra, and basic geometry.",
        "rewards": ["50 Coins", "200 XP", "Math Wizard Badge"],
        "min_level_required": 1
    },
    {
        "name": "Science",
        "icon": "Flask",
        "color": "bg-green-100 text-green-600",
        "difficulty": "beginner",
        "description": "Explore the natural world through scientific inquiry and experimentation.",
        "rewards": ["Scientific Method Mastery", "Observation +3", "Analytical Thinking"],
        "min_level_required": 1
    },
    {
        "name": "English",
        "icon": "Star",
        "color": "bg-blue-100 text-blue-600",
        "difficulty": "beginner",
        "description": "Develop your English language skills including grammar, vocabulary, and reading comprehension.",
        "rewards": ["Grammar Guru Badge", "200 XP", "Vocabulary Booster"],
        "min_level_required": 1
    },
    {
        "name": "History",
        "icon": "BookOpen",
        "color": "bg-yellow-100 text-yellow-600",
        "difficulty": "beginner",
        "description": "Journey through time and explore significant historical events and civilizations.",
        "rewards": ["History Buff Badge", "150 XP", "Time Traveler"],
        "min_level_required": 1
    },
]

# Difficulty configuration mapping
DIFFICULTY_CONFIG = {
    "beginner": {
        "label": "Beginner",
        "color": "bg-green-100",
        "textColor": "text-green-700",
        "level": 1,
        "min_level_required": 1
    },
    "intermediate": {
        "label": "Intermediate",
        "color": "bg-amber-100",
        "textColor": "text-amber-700",
        "level": 5,
        "min_level_required": 3
    },
    "advanced": {
        "label": "Advanced",
        "color": "bg-red-100",
        "textColor": "text-red-700",
        "level": 10,
        "min_level_required": 5
    }
}

def get_difficulty_config(difficulty: str) -> Dict[str, Any]:
    """Get difficulty configuration for a given difficulty level"""
    return DIFFICULTY_CONFIG.get(difficulty.lower(), DIFFICULTY_CONFIG["beginner"])

def get_topics_by_difficulty(difficulty: str) -> List[Dict[str, Any]]:
    """Get all topics for a specific difficulty level"""
    return [topic for topic in INITIAL_TOPICS if topic["difficulty"] == difficulty.lower()]

def get_topics_by_min_level(level: int) -> List[Dict[str, Any]]:
    """Get all topics that can be accessed at a given user level"""
    return [topic for topic in INITIAL_TOPICS if topic["min_level_required"] <= level] 