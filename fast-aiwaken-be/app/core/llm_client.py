import google.generativeai as genai
from app.config import settings
from typing import List, Dict, Any, Optional
import requests
import json 
from app.core.companion import CompanionLogic
from app.core.rag_memory import RAGMemory
from app.static_data.game_data import COMPANION_DETAILS, ENEMY_THEMES




class GeminiClient:

    # start of API client
    # Gemini API client
    def __init__(self):
        try:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.model = genai.GenerativeModel("gemini-1.5-flash-latest")
            self.rag_memory = RAGMemory()
        except Exception as e:
            print(f"Error initializing Gemini client: {e}")
            self.model = None


    # add to RAG memory
    def add_to_memory(self, entry: Dict[str, Any]):
        self.rag_memory.add(entry)
    

    # retrieve content from RAG memory
    def retrieve_rag_context(self, filter_fn=None, max_items=5) -> str:
        relevant = self.rag_memory.retrieve(filter_fn, max_items)
        context = "\n\n".join(
            f"Section: {item.get('section_title', '')}\n"
            f"Topic: {item.get('topic_title', '')}\n"
            f"Learning Step: {item.get('step_title', '')}\n"
            f"Content: {item.get('content', '')}\n"
            for item in relevant
        )
        return context


    # Youtube API client
    def search_youtube_video(self, query: str, api_key: str, max_results: int = 1) -> List[Dict[str, str]]:

        if not api_key:
            print("YouTube API key not configured. Skipping video search.")
            return []
        url = "https://www.googleapis.com/youtube/v3/search"
        params = {
            "part": "snippet",
            "q": query,
            "type": "video",
            "key": api_key,
            "maxResults": max_results,
            "relevanceLanguage": "en",
            "safeSearch": "moderate"
        }
        try:
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status() 
            results = response.json()
            videos = []
            for item in results.get("items", []):
                video_id = item["id"]["videoId"]
                title = item["snippet"]["title"]

                # ensure that link is a valid embeddable link
                link = f"https://www.youtube.com/watch?v={video_id}"
                thumbnail = item["snippet"]["thumbnails"].get("high", {}).get("url")
                videos.append({"title": title, "link": link, "thumbnail": thumbnail, "video_id": video_id})
            return videos
        except requests.exceptions.RequestException as e:
            print(f"Error searching YouTube: {e}")
            return []
        except Exception as e:
            print(f"An unexpected error occurred during YouTube search: {e}")
            return []
    # end of API client



    # Section for generating content using Gemini Model
    def generate_content(self, prompt: str, is_json_output: bool = False) -> Optional[str | Dict]:
        if not self.model:
            print("Gemini model not available.")
            return "Error: LLM service is not available." if not is_json_output else {"error": "LLM service not available."}
        try:
            response = self.model.generate_content(prompt)
            text_response = response.text.strip()
            if is_json_output:
                try:
                    if text_response.startswith("```json"):
                        text_response = text_response[7:]
                    if text_response.endswith("```"):
                        text_response = text_response[:-3]
                    return json.loads(text_response)
                except json.JSONDecodeError as e:
                    print(f"Error decoding JSON from LLM: {e}\nRaw response: {text_response}")
                    return {"error": "Failed to parse LLM JSON response", "details": text_response}
            return text_response
        except Exception as e:
            print(f"Error generating content with Gemini: {e}")
            return f"Error communicating with LLM: {str(e)}" if not is_json_output else {"error": f"Error communicating with LLM: {str(e)}"}



    # course outline section
    def generate_structured_course(self, subject: str, difficulty: str) -> Dict[str, Any]:
        """
        Generates a structured course outline with sections, topics, and learning steps.
        Each learning step includes a title and a suggested material type.
        """
        prompt = f"""
        Design a comprehensive learning course for the subject '{subject}' at a '{difficulty}' difficulty level.
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
          "subject": "{subject}",
          "difficulty": "{difficulty}",
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
        Ensure the JSON is well-formed.
        For 'text_with_image', the image should be illustrative of the concept.
        For 'youtube_video', it should be a tutorial or detailed explanation.
        For 'pdf_document', it should be a worksheet, a cheat sheet, or supplementary reading.
        """

        result = self.generate_content(prompt, is_json_output=True)

        # store to rag memory
        if result and not result.get("error"):
            for section in result.get("sections", []):
                for topic in section.get("topics", []):
                    for step in topic.get("learning_steps", []):
                        self.add_to_memory({
                            "section_title": section.get("section_title", ""),
                            "topic_title": topic.get("topic_title", ""),
                            "step_title": step.get("step_title", ""),
                            "content": None,
                            "material_type_suggestion": step.get("material_type_suggestion", ""),
                            "subject": subject,
                            "difficulty": difficulty
                        })
        return result
    



    # learning materials section
    def generate_learning_step_content(self, subject: str, topic_title: str, step_title: str,
                                    material_type_suggestion: str, difficulty: str, enemy_theme: Optional[str] = None) -> Dict[str, Any]:
        """
        Generates the actual content for a specific learning step based on its suggested material type.
        Optionally includes a themed character (e.g., a monster) for engagement.
        """
        content_result = {
            "type": material_type_suggestion,
            "content": None,
            "accompanying_text": None,
            "image_description": None,
            "video_details": None,
            "pdf_description": None
        }

        # Add themed character introduction if provided
        theme_intro = ""
        if enemy_theme:
                theme_intro_prompt = (
                    f"Generate a dynamic and engaging introduction for a learning step. The introduction should be themed around "
                    f"a character named '{enemy_theme}' who challenges the learner to master the concept. "
                    f"Make it fun, interactive, and motivational."
                )
                theme_intro = self.generate_content(theme_intro_prompt)

        # Build the base prompt
        prompt_text = (
            f"{theme_intro}\n"
            f"Explain the concept '{step_title}' for the topic '{topic_title}' in {subject} at a {difficulty} level.\n"
            f"Make the explanation engaging and include references to the {enemy_theme} to make it fun and interactive.\n"
            f"Use markdown formatting if appropriate."
        )

        if material_type_suggestion == "youtube_video":
            query = f"{subject} {topic_title} {step_title} {difficulty} tutorial"
            youtube_api_key = getattr(settings, 'YOUTUBE_API_KEY', None)
            videos = self.search_youtube_video(query, api_key=youtube_api_key, max_results=1)
            if videos:
                content_result["video_details"] = videos[0]
                content_result["content"] = videos[0]["link"]
                prompt_text = (
                    f"{theme_intro}\n"
                    f"Introduce the YouTube video titled '{videos[0]['title']}' about '{step_title}' in the topic '{topic_title}' ({subject}, {difficulty} level).\n"
                    f"Explain why this video is helpful and what the user will learn from it."
                )
                content_result["accompanying_text"] = self.generate_content(prompt_text)
            else:
                content_result["type"] = "text"
                content_result["accompanying_text"] = "Could not find a suitable video. Here's a text explanation instead:"
                material_type_suggestion = "text"

        if material_type_suggestion == "text":
            content_result["content"] = self.generate_content(prompt_text)

        elif material_type_suggestion == "text_with_image":
            prompt_text = (
                f"{theme_intro}\n"
                f"Explain the concept '{step_title}' for the topic '{topic_title}' in {subject} at a {difficulty} level.\n"
                f"Also, describe a simple, illustrative image that would visually aid in understanding this explanation.\n"
                f"Return a JSON object with two keys: 'explanation_text' (string) and 'image_description' (string for what the image should depict)."
            )
            response = self.generate_content(prompt_text, is_json_output=True)
            if response and not response.get("error"):
                content_result["content"] = response.get("explanation_text")
                content_result["image_description"] = response.get("image_description")
            else:
                content_result["content"] = "Error generating text with image description."
                content_result["image_description"] = "No description available."

        elif material_type_suggestion == "pdf_document":
            prompt_text = (
                f"{theme_intro}\n"
                f"Design comprehensive content for a 1-2 page PDF document on '{step_title}' ({topic_title}, {subject}, {difficulty} level).\n"
                f"Include the following elements:\n"
                f"1. A clear, descriptive title and brief introduction to the topic.\n"
                f"2. Main content structured as either:\n"
                f"   - A worksheet with 5-7 varied practice problems.\n"
                f"   - A concise summary sheet with key concepts and examples.\n"
                f"   - A set of practice problems with solutions.\n"
                f"3. For worksheets/practice problems: Include a mix of question types (multiple choice, short answer, application) with appropriate complexity for {difficulty} level.\n"
                f"4. For summary sheets: Organize key information with clear headings, concise explanations, and relevant examples.\n"
                f"5. Include specific examples and visual elements appropriate for {subject} at {difficulty} level.\n"
                f"Provide classroom-ready content that demonstrates clear progression of concepts related to '{step_title}' within the broader context of '{topic_title}'."
            )
            content_result["content"] = f"Downloadable PDF: {step_title}"
            content_result["pdf_description"] = self.generate_content(prompt_text)

        elif material_type_suggestion == "interactive_quiz_placeholder":
            content_result["content"] = f"An interactive quiz for '{step_title}' will be available here."
            content_result["accompanying_text"] = "Test your understanding with a few quick questions!"

        # Fallback if content is still None
        if content_result["content"] is None and material_type_suggestion not in ["youtube_video", "pdf_document", "interactive_quiz_placeholder"]:
            content_result["content"] = self.generate_content(prompt_text)
            content_result["type"] = "text"

        # Store to RAG memory
        self.add_to_memory({
            "section_title": "",
            "topic_title": topic_title,
            "step_title": step_title,
            "content": content_result["content"],
            "material_type_suggestion": material_type_suggestion,
            "subject": subject,
            "difficulty": difficulty
        })

        return content_result



    # summary and quiz section
    def generate_course_summary_and_quiz(self, course_title: str, subject: str, difficulty: str,
                                         sections_data: List[Dict], enemy_theme: Optional[str] = "a mysterious challenger") -> Dict[str, Any]:
        """
        Generates a course summary and a themed quiz.
        sections_data should be a list of section dicts, each containing topic titles.
        """
        topic_titles_covered = []
        for section in sections_data:
            for topic in section.get("topics", []):
                topic_titles_covered.append(topic.get("topic_title", "Unknown Topic"))
        
        topics_string = ", ".join(list(set(topic_titles_covered))) if topic_titles_covered else "various concepts"

        prompt = f"""
        You are creating a conclusion for an educational course.
        Course Title: "{course_title}"
        Subject: "{subject}"
        Difficulty: "{difficulty}"
        Topics Covered: {topics_string}
        Enemy Theme for Quiz: "{enemy_theme}"

        Generate the following as a single JSON object:
        1.  "summary": A concise and encouraging summary of the course (2-3 paragraphs), highlighting the key areas learned.
        2.  "quiz": An array of 5 multiple-choice quiz questions. Each question should:
            - Be relevant to one or more of the topics covered.
            - Be themed as if posed by '{enemy_theme}'.
            - Have a "question_text" (string).
            - Have an "options" array of 4 strings (one correct, three plausible distractors).
            - Have a "correct_answer" string (must exactly match one of the options).
            - Have a brief "explanation" string for why the answer is correct (1-2 sentences).

        Example quiz question structure:
        {{
            "question_text": "The {enemy_theme} cackles, 'What is the sum of 2 and 2 if you hope to pass?'",
            "options": ["3", "4", "5", "22"],
            "correct_answer": "4",
            "explanation": "Basic addition: 2 + 2 equals 4."
        }}

        Ensure the JSON is well-formed.
        """
        return self.generate_content(prompt, is_json_output=True)



    # generate quiz hint
    def generate_quiz_hint(self, quiz_question: str, topic_title: str = "", step_title: str = "") -> str:
        """
        Generate a hint for a quiz question using relevant context from RAG memory.
        Optionally filter by topic_title for more targeted context.
        """
        # filter function for relevant memory
        def filter_fn(item):
            if topic_title and topic_title.lower() in item.get("topic_title", "").lower():
                return True
            if step_title and step_title.lower() in item.get("step_title", "").lower():
                return True
            # Fallback: check if question keywords appear in content
            return any(word.lower() in (item.get("content") or "").lower() for word in quiz_question.split())

        # retrieve relevant context
        context = self.retrieve_rag_context(filter_fn=filter_fn, max_items=5)

        # build the prompt for the LLM
        prompt = (
            f"Here are some course materials that may help answer the following quiz question:\n"
            f"{context}\n\n"
            f"Quiz Question: {quiz_question}\n"
            f"Give a helpful hint (not the answer) to guide the student."
        )

        return self.generate_content(prompt)
    

    # generate tips for the user
    def generate_tips(self, subject: str, topic_title: str, step_title: str, difficulty: str) -> str:
        """
        Generates actionable, real-world tips for a specific topic or learning step.
        Includes examples and keeps the response concise and practical.
        """

        prompt = (
        f"Provide 1-3 techniques, real-world tips or hacks for the topic '{topic_title}' in the subject '{subject}' at a '{difficulty}' level.\n"
        f"Focus on less obvious but highly practical techniques or strategies that can help the user understand or apply the topic better.\n"
        f"Each tip should include a practical example or application to make it relatable.\n"
        f"Keep the tips concise, straight to the point, and easy to understand."
    )

        # gnerate the tips using the LLM
        return self.generate_content(prompt)
    



# Injection for FastAPI
llm_client = GeminiClient()
