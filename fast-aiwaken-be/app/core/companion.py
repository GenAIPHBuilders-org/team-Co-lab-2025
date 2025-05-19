from app.static_data.game_data import COMPANION_DETAILS


class CompanionLogic:
# companion details
    @staticmethod
    def get_companion_details(companion_name: str) -> dict:
        from app.static_data.game_data import COMPANION_DETAILS
        return COMPANION_DETAILS.get(companion_name, {})

# ability of model to generate a topic explanation
    @staticmethod
    def generate_topic_explanation(companion_name: str, subject: str, concept: str) -> str:
        from app.core.llm_client import llm_client  # <-- move import here
        details = CompanionLogic.get_companion_details(companion_name)
        personality = details.get("personality", "friendly and helpful")
        motivation_style = details.get("motivation_style", "supportive")
        prompt = (
            f"You are {companion_name}, a learning companion. "
            f"Your personality: {personality}. "
            f"Your motivation style: {motivation_style}. "
            f"Explain '{concept}' in {subject} to a student in a way that matches your personality and motivation style. "
            f"Keep it under 200 words."
        )
        return llm_client.generate_content(prompt)
    

# ability of model to generate a hint not finish yet
    @staticmethod
    def generate_hint(companion_name: str, question: str, memory_log: list) -> str:
        from app.core.llm_client import llm_client
        details = CompanionLogic.get_companion_details(companion_name)
        personality = details.get("personality", "friendly and helpful")
        motivation_style = details.get("motivation_style", "supportive")
        prompt = (
            f"You are {companion_name}, a learning companion. "
            f"Your personality: {personality}. "
            f"Your motivation style: {motivation_style}. "
            f"The user is answering the quiz question: '{question}'. "
            f"Here is what the user has learned so far:\n"
            f"{memory_log}\n"
            f"Based on this, give a helpful hint that reminds the user of relevant concepts they've already seen, "
            f"but do not give away the answer. Stay in character."
        )
        return llm_client.generate_content(prompt)