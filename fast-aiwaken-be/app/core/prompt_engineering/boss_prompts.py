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

    Generate a pool of boss fight questions for {username}:
    - 9 Easy questions
    - 10 Medium questions
    - 9 Hard questions

    Each boss fight session uses 10 questions from these pools, scaling difficulty based on {username}’s answers (start with medium; go easier if wrong, harder if right).

    For each question:
    - Address {username} directly, e.g., "Now, {username}, what is ...?" and vary the phrasing.
    - Subject: {subject}
    - Each question must have exactly these fields:
    - "id": a unique ID string, e.g., "easy_1", "medium_5"
    - "type": must be **one of** "true_false", "multiple_choice", or "fill_blank"
    - "question_text": the question phrased as the boss speaking to {username}
    - **If type is "multiple_choice": return a list of 4 options labeled "A.", "B.", "C.", and "D."**
    - **If type is not "multiple_choice": omit the "options" field entirely**
    - "correct_answer": the correct answer (must match the option label for multiple choice)
    - "explanation": a clear explanation for the answer
    - "difficulty": "easy", "medium", or "hard"
    - "topic": the relevant topic

    Also include:
    - "boss_intro": a dramatic introduction by the boss
    - "quiz_title": a fitting quiz title
    - "hearts": {hearts}
    - "start_pool": "medium"

    Return **only** the JSON object, no other text:

    {{
    "boss_intro": "String",
    "quiz_title": "String",
    "easy_questions": [{{...}}, ...],   // exactly 9 questions
    "medium_questions": [{{...}}, ...], // exactly 10 questions
    "hard_questions": [{{...}}, ...],   // exactly 9 questions
    "hearts": {hearts},
    "start_pool": "medium"
    }}
    """
    



    



