import google.generativeai as genai
from typing import Optional, Dict, Any
import json


class GeminiAPI:

    def __init__(self, api_key: str, model_name: str =  "gemini-1.5-flash-latest"):
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel(model_name)

    
    def send_prompt(self, prompt: str) -> Optional[str]:
        try:
            response = self.model.generate_content(prompt)
            return response.text if hasattr(response, "text") else None

        except Exception as e:
            print(f"#1 Error with GenAI: {e}")
            return None


    def generate_content(self, prompt: str, is_json_output: bool = False) -> Optional[str | Dict]:
            try:
                response = self.send_prompt(prompt)
                if response is None:
                    print("No response from model")
                    return {"error": "No response from LLM"}
                text_response = response.strip()
                print(f"{text_response}")
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
                return {"error": f"Error communicating with LLM: {str(e)}"}
