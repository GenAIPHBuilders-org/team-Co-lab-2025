from typing import Dict
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
        from app.core.llm_client import llm_client 
        details = CompanionLogic.get_companion_details(companion_name)
        motivation_style = details.get("motivation_style", "supportive")
        
        prompt = (
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
    

    # generate motivation based on companion's topic
    @staticmethod
    def generate_quiz_motivation(companion_name: str, subject: str) -> str:
        '''Motivational message to encourage the user to take a quiz.'''
        from app.core.llm_client import llm_client
        details = CompanionLogic.get_companion_details(companion_name)
        personality = details.get("personality", "friendly and encouraging")
        motivation_style = details.get("motivation_style", "supportive")


        prompt = (
        f"You are {companion_name}, a learning companion with a {personality} personality. "
        f"Your motivation style is {motivation_style}. "
        f"The user is learning the topic '{subject}'. "
        f"Encourage them to take the quiz for this topic and finish their course chapter. "
        f"Make the message heartfelt, inspiring, and full of positive energy. "
        f"Use emotional language to make the user feel confident and motivated. "
        f"Keep the message short (2-3 sentences)."
        )

        # Generate the motivational message using the LLM
        return llm_client.generate_content(prompt)
    
    @staticmethod
    def generate_boss_feedback(analysis: Dict, companion_name: str) -> str:
        """
        Generate feedback after losing boss battle
        :param analysis: Performance analysis from analyze_boss_performance
        """
        details = CompanionLogic.get_companion_details(companion_name)
        personality = details.get("personality", "supportive")
        
        strengths = analysis.get("strengths", [])[:3] or ["several concepts"]
        weaknesses = list(analysis.get("weaknesses", {}).keys())[:3] or ["a few areas"]
        mistakes = analysis.get("common_mistakes", [])[:2] or ["some common errors"]
        
        prompt = (
            f"As {companion_name} with a {personality} personality, "
            f"provide constructive feedback after a lost boss battle:\n"
            f"- Strengths: {', '.join(strengths)}\n"
            f"- Areas needing improvement: {', '.join(weaknesses)}\n"
            f"- Common mistakes: {'; '.join(mistakes)}\n"
            f"Make it encouraging but honest. Suggest specific practice strategies. "
            f"Keep it to 2-3 paragraphs max."
        )
        return llm_client.generate_content(prompt)