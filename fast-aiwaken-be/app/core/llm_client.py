import google.generativeai as genai
import requests
import json 
from app.config import settings
from typing import List, Dict, Any, Optional
from app.core.companion import CompanionLogic
from app.core.rag_memory import RAGMemory
from app.static_data.game_data import COMPANION_DETAILS, ENEMY_THEMES
from app.core.utils.pdf_generator import generate_pdf
from app.core.llm.gemini_client import GeminiAPI
from app.core.llm.youtube_client import YouTubeAPI
from app.core.prompt_engineering.course_prompts import CoursePrompts
from app.core.prompt_engineering.quiz_prompts import generate_quiz_hint, retrieve_relevant_context, generate_tips_prompt
from fastapi import Depends
from app.models.user_model import User
from app.dependencies import get_current_user, get_db
from sqlalchemy.orm import Session




class LLMClient:

    def __init__(self):
        try:
            self.gemini_api = GeminiAPI(api_key=settings.GEMINI_API_KEY)
            self.youtube_api = YouTubeAPI(api_key=settings.YOUTUBE_API_KEY)
            self.rag_memory = RAGMemory()
        except Exception as e:
            print(f"# 2 Error initializing {e}")

    # Youtube API client
    def search_youtube_video(self, query: str, api_key: str, max_results: int = 1) -> List[Dict[str, str]]:
        return self.youtube_api.search_videos(query, max_results)
       
    # Content generator
    def generate_content(self, prompt: str, is_json_output: bool = False) -> Optional[str | Dict]:
        return self.gemini_api.generate_content(prompt, is_json_output)

    # RAG memory
    def add_to_memory(self, entry: Dict[str, Any]):
        self.rag_memory.add_to_memory(entry)

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

    # course outline section
    def generate_structured_course(self, subject: str, difficulty: str, username:str, companion_name:str,
                                    age_range: str, motivational_level: str, learning_goal: str,
                                    explanation_depth: str, learning_style: str) -> Dict[str, Any]:

        prompts = CoursePrompts(subject, difficulty)
        prompt = prompts.generate_course(
            username=username,
            companion_name=companion_name,
            age_range=age_range,
            motivational_level=motivational_level,
            learning_goal=learning_goal,
            explanation_depth=explanation_depth,
            learning_style=learning_style,
        )
        course_structure = self.generate_content(prompt, is_json_output=True)
        
        for section in course_structure.get("sections", []):
            for topic in section.get("topics", []):
                for step in topic.get("learning_steps", []):
                    step_title = step.get("step_title", "")
                    material_type_suggestion = step.get("material_type_suggestion","")
                      # companion details
                    companion_details = COMPANION_DETAILS.get(companion_name, {})
                    motivation_style = companion_details.get("motivation_style", "supportive and encouraging")
                    step_content = self.generate_learning_step_content(
                        subject = subject,
                        topic_title = topic.get("topic_title", ""),
                        step_title=step_title,
                        material_type_suggestion=material_type_suggestion,
                        difficulty=difficulty,
                        username=username,
                        companion_name=companion_name,
                        learning_goal=learning_goal,
                        age_range=age_range,
                        motivational_level=motivational_level,
                        motivation_style=motivation_style,
                        explanation_depth=explanation_depth,
                        learning_style=learning_style,
                    )

                    step["content"] = step_content
                    
        # store to rag memory
        if course_structure and not course_structure.get("error"):
            for section in course_structure.get("sections", []):
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
        return course_structure
    
    # learning materials section
    def generate_learning_step_content(self, subject: str, topic_title: str, step_title: str,
                                    material_type_suggestion: str, difficulty: str,username: str, companion_name: str,
                                    learning_goal: str, age_range: str, motivational_level: str, motivation_style: str, explanation_depth: str, learning_style: str,
                                    enemy_theme: Optional[str] = None) -> Dict[str, Any]:
        content_result = {
            "type": material_type_suggestion,
            "content": None,
            "accompanying_text": None,
            "image_description": None,
            "video_details": None,
            "pdf_description": None
        }

        prompts = CoursePrompts(subject, difficulty)
        prompt_text = prompts.generate_learning_step(
            step_title=step_title, 
            topic_title=topic_title, 
            material_type_suggestion=material_type_suggestion, 
            companion_name=companion_name, 
            username=username,
            learning_goal=learning_goal, 
            age_range=age_range, 
            motivational_level=motivational_level, 
            motivation_style=motivation_style, 
            explanation_depth=explanation_depth, 
            learning_style=learning_style
            )

        try:
            print(f"Generating content for: {step_title} ({material_type_suggestion})")           
            if material_type_suggestion == "youtube_video":
                        print(" Attempting to generate YT course")
                        query = f"{subject} {topic_title} {step_title} {difficulty} tutorial"
                        youtube_api_key = getattr(settings, 'YOUTUBE_API_KEY', None)
                        videos = self.search_youtube_video(query, api_key=youtube_api_key, max_results=1)
                        if videos:
                            print(f"Generated Youtube {videos[0]}")
                            return {"type": "youtube_video", "content": None, "video_details" : videos[0]}
                        else:
                            print("No YT video found")
                            return {"type": "youtube_video", "content":None, "video_details" : None}

            response = self.generate_content(prompt_text, is_json_output=(material_type_suggestion == "text_with_image"))       

            # text image material
            if material_type_suggestion == "text_with_image":
                if response and not response.get("error"):
                    content_result["content"] = response.get("explanation_text")
                    content_result["image_description"] = response.get("image_description")
                else:
                    print(f"Invalid JSON response for text_with_image: {response}")
                    content_result["content"] = response if isinstance(response, str) else "Error generating content."
                    content_result["image_description"] = "No image description available."

            # pdf material
            elif material_type_suggestion == "pdf_document" and response:
                pdf_filename = f"{step_title.replace(' ', '_')}.pdf"
                pdf_path = generate_pdf({"title" : step_title, "main_content" : response}, pdf_filename)
                content_result["content"] = pdf_path
                content_result["pdf_description"] = response
                
            # quiz material
            elif material_type_suggestion == "interactive_quiz_placeholder":
                try:
                    if not response:
                        print("Error: Response is empty or None.")
                        content_result["content"] = "Error generating quiz content."
                        content_result["accompanying_text"] = "No quiz available."
                        return content_result
                    
                    if isinstance(response, str):                   
                        start_idx = response.find('{')
                        end_idx = response.rfind('}') + 1                     
                        if start_idx != -1 and end_idx > start_idx:
                            json_str = response[start_idx:end_idx]
                            response = json.loads(json_str)
                        else:
                            raise ValueError("No JSON object found in response")                
                    if response and not response.get("error"):
                        print(f"Quiz: {response}")
                        content_result["content"] = response.get("quiz", "No quiz available.")
                        content_result["accompanying_text"] = "Test your understanding with this quiz!"
                    else:
                        print(f"Error generating quiz: {response}")
                        content_result["content"] = "Error generating quiz content."
                        content_result["accompanying_text"] = "No quiz available."                     
                except (json.JSONDecodeError, ValueError) as e:
                    print(f"Error parsing quiz response: {e}")
                    print(f"Raw response: {response}")
                    content_result["content"] = "Error generating quiz content."
                    content_result["accompanying_text"] = "No quiz available."     
            else:
                content_result["content"] = response if response else "Error generating content."

            # fallback if None
            if content_result["content"] is None and material_type_suggestion not in ["youtube_video", "pdf_document", "interactive_quiz_placeholder"]:
                content_result["content"] = self.generate_content(prompt_text)
                content_result["type"] = "text"        

        except Exception as e:
            print(f"Error generating content for {step_title} : {str(e)}")
            return {"error" : f"Failed to generate {step_title}"}

        # store to RAG memory
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


    # generate quiz hint
    def generate_quiz_hint(self, quiz_question: str, topic_title: str = "", step_title: str = "", username: str = "") -> str:
        context = retrieve_relevant_context(self.rag_memory, quiz_question, topic_title, step_title, max_items = 5)
        prompt = generate_quiz_hint(quiz_question, context, username)
        return self.generate_content(prompt)

    # generate tips for the user
    def generate_tips(self, subject: str, topic_title: str, step_title: str, difficulty: str, 
                      username: str) -> str:  
        prompt = generate_tips_prompt(subject, topic_title, step_title, difficulty, username)
        return self.generate_content(prompt)

    # summary and boss section
    def generate_course_summary_and_quiz(self, course_title: str, subject: str, difficulty: str,
                                         sections_data: List[Dict], enemy_theme: Optional[str] = "a mysterious challenger") -> Dict[str, Any]:
        prompts = CoursePrompts(subject, difficulty)
        prompt = prompts.generate_course_summary_and_quiz(course_title, sections_data, enemy_theme)
        response = self.generate_content(prompt, is_json_output=True)

        return response


llm_client = LLMClient()
