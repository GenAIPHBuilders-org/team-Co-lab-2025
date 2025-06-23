import random
from typing import List, Dict, Any
from app.core.utils.redis_client import get_from_redis


# extract topics
def extract_topic(rag_entries: List[Dict[str, Any]]) -> List[str]:
    if not rag_entries:
        return []
        
    recent_subject = rag_entries[-1].get("subject")
    course_entries = [e for e in rag_entries if e.get("subject") == recent_subject]
    topics = []
    seen = set()
    for e in course_entries:
        topic = e.get("topic_title")
        if topic and topic not in seen:
            topics.append(topic)
            seen.add(topic)
        return topics

def generate_boss_prompt(user_info: Dict[str, Any], rag_entries: List[Dict[str, Any]], 
                        hearts: int) -> str:

    topics = extract_topic(rag_entries)
    topics_str = ", ".join(topics) if topics else "core concepts"
    username = user_info.get("username", "the learner")
    subject = rag_entries[-1].get("subject", "your course") if rag_entries else "your course"

    return f"""
    Focus on these topics: {topics_str}

    Generate a pool of questions for the boss fight:
    - 9 Easy
    - 10 Medium
    - 9 Hard

    Each boss fight session will use 10 questions from these pools, scaling difficulty based on user performance (start with medium, go easier if wrong, harder if right).

    For each question, address {username} directly, e.g., "Now, {username}, what is ...?". Vary the phrasing for each question to keep it dynamic and engaging.

    Each question must have:
    - "id": unique string (e.g., "easy_1", "medium_5")
    - "type": "true_false", "multiple_choice", or "fill_blank"
    - "question_text": the question itself, phrased as if the boss is speaking to {username}
     "options": array of options (for multiple_choice only), each option should be labeled as "A.", "B.", "C.", or "D." (e.g., ["A. Option 1", "B. Option 2", ...])
    - "correct_answer": the correct answer
    - "explanation": explanation for the answer
    - "difficulty": "easy", "medium", or "hard"
    - "topic": the relevant topic

    Also include:
    - "boss_intro": a string (the boss's introduction)
    - "quiz_title": a string
    - "hearts": {hearts}
    - "start_pool": "medium"

    Return as JSON:
    {{
        "boss_intro": "String",
        "quiz_title": "String",
        "easy_questions": [{{...}}, ...],   // 9 questions
        "medium_questions": [{{...}}, ...], // 10 questions
        "hard_questions": [{{...}}, ...],   // 9 questions
        "hearts": {hearts},
        "start_pool": "medium"
    }}
    Do not include any text outside the JSON object.
    """
    



    



