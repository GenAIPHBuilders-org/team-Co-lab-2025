from typing import List, Dict, Any, Optional

class CoursePrompts:
    def __init__(self, subject: str, difficulty: str):
        self.subject = subject
        self.difficulty = difficulty
    
    # generate course stucture
    def generate_course(self) -> str:
        return f"""
        Design a comprehensive learning course for the subject '{self.subject}' at a '{self.difficulty}' difficulty level.
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
        """
    # content generation
    def generate_learning_step(self, step_title: str, topic_title: str, material_type: str, enemy_theme: Optional[str] = None) -> str:
        theme_intro = f"A character named '{enemy_theme}' challenges you to master this concept!" if enemy_theme else ""
        base_prompt = f"""
        {theme_intro}
        Explain the concept '{step_title}' for the topic '{topic_title}' in {self.subject} at a {self.difficulty} level.
        Make the explanation engaging and interactive.
        Use markdown formatting if appropriate.
        """

        # handle text with image
        if material_type == "text_with_image":
            return f"""
            {base_prompt}
            Additionally, describe a simple, illustrative image that would visually aid in understanding this explanation.
            Return the output as a valid JSON object with the following structure:
            {{
              "explanation_text": "String (the explanation of the concept)",
              "image_description": "String (a description of the image that visually represents the concept)"
            }}
            Do not include any text outside the JSON object.
            """

        # handle pdf_document
        elif material_type == "pdf_document":
            return f"""
            Design a professional and well-structured 1-2 page PDF document on '{step_title}' ({topic_title}, {self.subject}, {self.difficulty} level).
            Include the following elements:
            1. A clear and engaging title for the document.
            2. A brief introduction to the topic, explaining its importance and relevance.
            3. Main content structured as:
              - Key concepts explained concisely.
              - Examples to illustrate the concepts.
              - Practice problems (5-7) with varying difficulty levels.
            4. A summary or conclusion to reinforce the key takeaways.
            5. Provide answers and explanations for the practice problems.
            Ensure the content is clear, concise, and formatted for readability.
            Return the content as plain text, with answers and explanations clearly separated.
            """

        # handle quiz
        elif material_type == "interactive_quiz_placeholder":
            return f"""
            Create an interactive quiz for the concept '{step_title}' under the topic '{topic_title}'.
            Include 5 multiple-choice questions with 4 options each (1 correct answer and 3 plausible distractors).
            Return the output as a valid JSON object with the following structure:
            {{
              "quiz": [
                {{
                  "question_text": "String (the quiz question)",
                  "options": ["String (option 1)", "String (option 2)", "String (option 3)", "String (option 4)"],
                  "correct_answer": "String (the correct answer, matching one of the options)",
                  "explanation": "String (a brief explanation of why the answer is correct)"
                }},
                ...
              ]
            }}
            Do not include any text outside the JSON object.
            """


        return base_prompt

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


    
    
     