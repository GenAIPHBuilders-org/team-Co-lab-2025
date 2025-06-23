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
        "name": "Basic Python",
        "icon": "Code",
        "color": "bg-purple-100 text-purple-600",
        "difficulty": "advanced",
        "description": "Learn the basics of Python programming including syntax, variables, and simple logic.",
        "rewards": ["Python Novice Badge", "200 XP", "Code Starter Pack"],
        "min_level_required": 5
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
    {
        "name": "Geography",
        "icon": "Globe",
        "color": "bg-teal-100 text-teal-600",
        "difficulty": "beginner",
        "description": "Discover the world's countries, capitals, and geographical features.",
        "rewards": ["World Explorer Badge", "150 XP", "Map Master"],
        "min_level_required": 1
    },
    {
        "name": "Art & Design",
        "icon": "Palette",
        "color": "bg-pink-100 text-pink-600",
        "difficulty": "intermediate",
        "description": "Express your creativity through various art forms and design principles.",
        "rewards": ["Creative Genius Badge", "250 XP", "Artistic Vision"],
        "min_level_required": 3
    },
    {
        "name": "Music Theory",
        "icon": "Music",
        "color": "bg-indigo-100 text-indigo-600",
        "difficulty": "intermediate",
        "description": "Learn the fundamentals of music theory, notation, and composition.",
        "rewards": ["Music Maestro Badge", "250 XP", "Harmony Master"],
        "min_level_required": 3
    },
    {
        "name": "Advanced Mathematics",
        "icon": "Function",
        "color": "bg-red-100 text-red-600",
        "difficulty": "advanced",
        "description": "Dive deep into calculus, trigonometry, and advanced mathematical concepts.",
        "rewards": ["Math Genius Badge", "300 XP", "Calculus Master"],
        "min_level_required": 8
    },
    {
        "name": "Web Development",
        "icon": "Monitor",
        "color": "bg-cyan-100 text-cyan-600",
        "difficulty": "advanced",
        "description": "Build modern websites using HTML, CSS, and JavaScript.",
        "rewards": ["Web Developer Badge", "300 XP", "Code Craftsman"],
        "min_level_required": 6
    }
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