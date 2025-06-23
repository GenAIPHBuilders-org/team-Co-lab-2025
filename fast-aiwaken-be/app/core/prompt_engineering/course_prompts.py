from typing import List, Dict, Any, Optional
from app.static_data.game_data import COMPANION_DETAILS


class CoursePrompts:
    def __init__(self, subject: str, difficulty: str):
        self.subject = subject
        self.difficulty = difficulty
    
    # get companion details
    def get_companion_details(self, companion_name: str) -> Dict[str, Any]:
        if companion_name not in COMPANION_DETAILS:
          raise ValueError(f"Invalid companion name: {companion_name}. Choose from: {', '.join(COMPANION_DETAILS.keys())}")
        return COMPANION_DETAILS[companion_name]
    
   
    # generate course stucture
    def generate_course(self, username:str, companion_name:str, age_range: str, motivational_level: str, 
                        learning_goal: str, explanation_depth: str, learning_style: str) -> str:

        companion_details = self.get_companion_details(companion_name)
        companion_title = companion_details.get("title")
        companion_personality = companion_details.get("personality")
        companion_motivation_style = companion_details.get("motivation_style")

        # base prompt
        return f"""
        As a learning companion named {companion_name}, with a {companion_personality} personality and a {companion_motivation_style} motivation style, your task is to design a personalized learning course.

        The course is for a user named '{username}'. You must design the course to perfectly fit their learning profile:
        - **Age Range:** {age_range}
        - **Motivational Level:** {motivational_level}
        - **Primary Learning Goal:** {learning_goal}
        - **Desired Explanation Depth:** {explanation_depth}
        - **Preferred Learning Style:** {learning_style}

        Now, design a comprehensive learning course for the subject '{self.subject}' at a '{self.difficulty}' difficulty level.
        The structure, topics, learning steps, and especially the 'material_type_suggestion' must be carefully tailored to the learner's profile above. For example:
        - A 'visual' learner should get more 'youtube_video' and 'text_with_image' suggestions.
        - A learner with 'low' motivation should have shorter topics and more 'interactive_quiz_placeholder' to maintain engagement.
        - The 'learning_goal' (e.g., "to pass an exam") should influence the types of topics and practice steps.
        - The 'age_range' should dictate the complexity of the language and examples in the step titles.
        - The 'explanation_depth' should determine how granular the learning steps are.

        The course should have a clear title and a brief description.
        Organize the course into 3-5 logical sections. Each section should have a title.
        Within each section, define 2-4 specific topics. Each topic should have a title.
        For each topic, outline 2-4 learning steps. Each learning step should have:
        1.  A concise "step_title" (e.g., "Introduction to [Concept]", "Applying [Concept] with Examples", "Video Guide: [Concept] in Action", "Practice Worksheet: [Concept]").
        2.  A "material_type_suggestion" from the following options: "text", "text_with_image", "youtube_video", "pdf_document", "interactive_quiz_placeholder".

        Return the output as a single JSON object with the following structure:
        {{
          "course_title": "String",
          "course_description": "String",
          "subject": "{self.subject}",
          "difficulty": "{self.difficulty}",
          "sections": [
            {{
              "section_id": "String (e.g., section_1)",
              "section_title": "String",
              "topics": [
                {{
                  "topic_id": "String (e.g., topic_1_1)",
                  "topic_title": "String",
                  "learning_steps": [
                    {{"step_id": "String (e.g., step_1_1_1)", "step_title": "String", "material_type_suggestion": "String"}},
                    ...
                  ]
                }},
                ... // Other topics in this section
              ]
            }},
            ... // Other sections
          ]
        }}
        Do not include any text outside the JSON object.
        """


    # content generation
    def generate_learning_step(self, step_title: str, topic_title: str, material_type_suggestion: str, companion_name: str, username: str,
                              learning_goal: str,  age_range: str, motivational_level: str, motivation_style: str, explanation_depth: str, learning_style: str) -> str:

        # Companion details
        companion_details = self.get_companion_details(companion_name)
        companion_personality = companion_details.get("personality")
        companion_motivation_style = companion_details.get("motivation_style")

        # --- Unified System Prompt ---
        base_prompt = f"""
        You are {companion_name}, a learning companion with a '{companion_personality}' personality and a '{companion_motivation_style}' motivation style.
        Your task is to generate learning material for a user named '{username}'.

        **CRITICAL INSTRUCTIONS:**
        1.  **User Profile Adherence:** You MUST generate content that is perfectly aligned with the user's profile below. The tone, complexity, and examples must be appropriate.
            - **Age Range:** {age_range}
            - **Motivational Level:** {motivational_level}
            - **Learning Goal:** {learning_goal}
            - **Explanation Depth:** {explanation_depth}
            - **Learning Style:** {learning_style}

        2.  **Personalization:** To make the content feel personal, occasionally mention the user's name, '{username}'. A perfect time to do this is when giving an example, like "For instance, {username}, imagine..." or "Let's consider an example for you, {username}." Use this naturally, not in every sentence.

        3.  **Content Focus:** The content you generate is for the step '{step_title}' within the topic '{topic_title}' for the subject '{self.subject}' at a '{self.difficulty}' level.
        """

        # --- Handle Specific Material Types ---
        if material_type_suggestion == "text":
           
            return f"""
            {base_prompt}
            Now, please provide a clear and engaging explanation of the concept.
            Use markdown formatting where appropriate to improve readability (e.g., lists, bolding).
            """

        elif material_type_suggestion == "text_with_image":
            return f"""
            {base_prompt}
            First, write a clear and engaging explanation of the concept.
            Second, describe a simple, illustrative image that would visually aid in understanding this explanation.

            Return the output as a single, valid JSON object with the following structure:
            {{
              "explanation_text": "String (the explanation of the concept, personalized for {username})",
              "image_description": "String (a description of the image that visually represents the concept)"
            }}
            Do not include any text outside the JSON object.
            """

        elif material_type_suggestion == "interactive_quiz_placeholder":
            return f"""
            {base_prompt}
            Imagine a series of monsters, each themed around the topic '{topic_title}', appear to personally challenge {username} in a quiz battle.

            Each monster must:
            - Have a unique name inspired by the topic '{topic_title}'.
            - Have a distinct personality and style of speaking.
            - Introduce itself in character, addressing {username} directly (e.g., "Heh heh... Hello {username}... I am Vaporion, the spirit of the unseen!").
            - Include some short lore or flavor that connects it to the topic.

            Example monster_intro for a question:
            - "Hee hee... Hello {username}. I am Vaporion, the spirit of the unseen! I’ve mastered the secrets of gases and vapors. Now, YOU must answer my question... or be turned into mist!"

            The quiz must:
            - Include 5 multiple-choice questions, each asked by a different monster.
            - Reflect the topic and personality of the monster asking the question.
            - Be tailored to {username}’s profile (e.g., relevant scenarios, age-appropriate).

            For each question, provide:
            - A "monster_intro" string (the monster introducing itself and asking the question in character).
            - A "question_text" string (the monster asking the question in its own style).
            - A list of 4 "options" (multiple-choice answers).
            - A "correct_answer" string (must exactly match one of the options).
            - A "explanation" for the correct answer (2–3 sentences).
            - A dictionary of "incorrect_explanation" with keys as each option, explaining why each wrong one is incorrect (2–3 sentences each).

            Return your response strictly as a valid JSON object with the following structure:
            {{
              "quiz": [
                {{
                  "monster_intro": "String (monster’s in-character intro, greeting {username}, introducing itself, and issuing the challenge)",
                  "question_text": "String (monster asks a question in its own style)",
                  "options": ["String", "String", "String", "String"],
                  "correct_answer": "String",
                  "explanation": "String (explanation for the correct answer)",
                  "incorrect_explanation": {{
                    "option_1": "String",
                    "option_2": "String",
                    "option_3": "String",
                    "option_4": "String"
                  }}
                }},
                ... // 4 more questions
              ]
            }}

            Do not include any text outside the JSON object.
            """


        return base_prompt

    # generate course summary (needs revision)
    def generate_course_summary_and_quiz(self, course_title: str, sections_data: List[Dict], enemy_theme: Optional[str] = "a mysterious challenger") -> str:
      topic_titles_covered = []
      for section in sections_data:
          for topic in section.get("topics", []):
              topic_titles_covered.append(topic.get("topic_title", "Unknown Topic"))
      
      topics_string = ", ".join(list(set(topic_titles_covered))) if topic_titles_covered else "various concepts"

      return f"""
      You are creating a conclusion for an educational course.
      Course Title: "{course_title}"
      Subject: "{self.subject}"
      Difficulty: "{self.difficulty}"
      Topics Covered: {topics_string}
      Enemy Theme for Quiz: "{enemy_theme}"

      Generate the following as a single JSON object:
      1.  "summary": A concise and encouraging summary of the course (2-3 paragraphs)
      2.  "quiz": An array of 5 quiz questions with these types:
          - 2 True/False questions
          - 2 Multiple Choice questions (with 3 options: A, B, C)
          - 1 Fill-in-the-Blank question (max 10 letters)
          
          Each question should:
          - Be relevant to the topics covered
          - Be themed as if posed by '{enemy_theme}'
          - Include:
              "type": "true_false/multiple_choice/fill_blank"
              "question_text": "String"
              "options": ["A: Option1", "B: Option2", "C: Option3"] (only for multiple_choice)
              "correct_answer": "String"
              "explanation": "String (1-2 sentences)"
              "difficulty": "easy/medium/hard"
              "topic": "String"
              
          Fill-in-the-Blank format: 
          - Represent blanks with 5-10 underscores (_____)
          - Answers should be short (max 10 letters)
          
          Example True/False:
          {{
              "type": "true_false",
              "question_text": "The {enemy_theme} challenges you: 'Water boils at 100°C at sea level. True or false?'",
              "correct_answer": "True",
              "explanation": "Water boils at 100°C at standard atmospheric pressure.",
              "difficulty": "easy",
              "topic": "Physics"
          }}
          
          Example Fill-in-the-Blank:
          {{
              "type": "fill_blank",
              "question_text": "The {enemy_theme} hisses: 'The capital of France is _______.'",
              "correct_answer": "Paris",
              "explanation": "Paris has been the capital since 508 AD.",
              "difficulty": "easy",
              "topic": "Geography"
          }}
      """
    # course suggestion prompt
    @staticmethod
    def suggested_course(username: str, motivational_level: str, learning_goal: str, age_range: str, 
                        explanation_depth: str, learning_style: str) -> str:
        return f"""
        Return your response as a valid JSON object with two fields:
        - "intro": A friendly, dynamic greeting to {username} encouraging them to try the suggested courses. Example: "Hello {username}! Based on your learning profile, here are some courses you might love."
        - "suggestions": An array of at least 3 course suggestions, each with "subject", "course_title", and "course_description".

        Each suggestion must include:
        - "subject": The main subject area (e.g., "Mathematics", "Biology", "History")
        - "course_title": A catchy, engaging title
        - "course_description": 2-3 sentences explaining what the course covers and why it fits the user's profile

        The suggestions must be tailored to this user's profile:
        - Age Range: {age_range}
        - Motivational Level: {motivational_level}
        - Primary Learning Goal: {learning_goal}
        - Desired Explanation Depth: {explanation_depth}
        - Preferred Learning Style: {learning_style}

        Example response:
        {{
          "intro": "Hello {username}! Based on your learning style and goals, here are some courses you should try.",
          "suggestions": [
            {{
              "subject": "Mathematics",
              "course_title": "Mastering Algebra for Visual Learners",
              "course_description": "A course designed for visual learners who want to build strong algebra skills with lots of diagrams and interactive examples. Perfect for students aiming to pass exams with confidence."
            }},
            {{
              "subject": "Biology",
              "course_title": "Life Science Adventures",
              "course_description": "Explore the wonders of biology through hands-on experiments and engaging stories. Ideal for curious minds who love to learn by doing."
            }},
            {{
              "subject": "History",
              "course_title": "World History Through Stories",
              "course_description": "Travel through time and discover key historical events with interactive storytelling and visual timelines. Great for learners who enjoy narrative and context."
            }}
          ]
        }}

        Do not include any text outside the JSON object.
        """



    
    
     