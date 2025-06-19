from typing import Any, Callable, List, Dict

# generate quiz
def generate_quiz_hint(quiz_question: str, context :str) -> str:    

    prompt = (
        f"Here are some course materials that may help answer the following quiz question:\n"
        f"{context}\n\n"
        f"Quiz Question: {quiz_question}\n"
        f"Give a helpful hint (not the answer) to guide the student."
    )

    return prompt

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