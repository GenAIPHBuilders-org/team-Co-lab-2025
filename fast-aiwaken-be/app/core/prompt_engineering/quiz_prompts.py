from typing import Any,  Dict

def generate_quiz_hint(quiz_question: str, context :str, username: str) -> str:    

    prompt = (
        f"Here are some course materials that may help answer the following quiz question:\n"
        f"{context}\n\n"
        f"Quiz Question: {quiz_question}\n"
        f"Give a helpful hint (not the answer) to guide the student.\n"
        f"Hello {username}!\n, Explain that you can provide better tips, the higher his level is.\n"
        f"Here is the hint: "
    )

    return prompt

def generate_tips_prompt(subject: str, topic_title: str, step_title: str, difficulty: str, username: str) -> str:
    return (
        f"Provide 1-3 techniques, real-world tips or hacks for the topic '{topic_title}' in the subject '{subject}' at a '{difficulty}' level.\n"
        f"Focus on less obvious but highly practical techniques or strategies that can help the user understand or apply the topic better.\n"
        f"Each tip should include a practical example or application to make it relatable.\n"
        f"Keep the tips concise, straight to the point, and easy to understand.\n"
        f"Hello {username}!\n, Explain that you can provide better tips, the higher his level is."
        f"Here are the tips: "
    )

# relevant content from the course
def retrieve_relevant_context(rag_memory, quiz_question: str, topic_title: str="", step_title: str="", max_items: int =5) -> str:

    def filter(item):
        if topic_title and topic_title.lower() in item.get("topic_title", "").lower():
            return True
        if step_title and step_title.lower() in item.get("step_title", "").lower():
            return True    
        return any(word.lower() in (item.get("content") or "").lower() for word in quiz_question.split())

    relevant = rag_memory.retrieve(filter, max_items)
    context = "\n\n".join(
        f"Section: {item.get('section_title', '')}\n"
        f"Topic: {item.get('topic_title', '')}\n"
        f"Learning Step: {item.get('step_title', '')}\n"
        f"Content: {item.get('content', '')}\n"
        for item in relevant
    )

    return context

# quiz evaluation
def evaluate_quiz_answer(user_answer: str, question: Dict[str, Any]) -> Dict[str, Any]:
    """
    Evaluate the user's answer and provide feedback.
    """
    correct_answer = question["correct_answer"]
    explanation = question["explanation"]
    incorrect_explanations = question["incorrect_explanation"]

    if user_answer == correct_answer:
        return {
            "is_correct": True,
            "message": f"Correct! {explanation}"
        }
    else:
        return {
            "is_correct": False,
            "message": f"Incorrect. {incorrect_explanations.get(user_answer, 'No explanation available.')}"
        }