

def generate_tips_prompt(subject: str, topic_title: str, step_title: str, difficulty: str) -> str:
    """
    Generate a prompt for actionable tips for a specific topic or learning step.
    """
    return (
        f"Provide 1-3 techniques, real-world tips or hacks for the topic '{topic_title}' in the subject '{subject}' at a '{difficulty}' level.\n"
        f"Focus on less obvious but highly practical techniques or strategies that can help the user understand or apply the topic better.\n"
        f"Each tip should include a practical example or application to make it relatable.\n"
        f"Keep the tips concise, straight to the point, and easy to understand."
    )