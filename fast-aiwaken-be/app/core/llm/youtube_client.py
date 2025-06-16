import requests
from typing import List, Dict

class YouTubeAPI:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://www.googleapis.com/youtube/v3"

    def search_videos(self, query: str, max_results: int = 5) -> List[Dict[str, str]]:
        params = {
            "part": "snippet",
            "q": query,
            "type": "video",
            "maxResults": max_results,
            "key": self.api_key,
            "relevanceLanguage": "en",
            "safeSearch": "moderate"
        }
        try:
            response = requests.get(f"{self.base_url}/search", params=params, timeout=10)
            response.raise_for_status()
            items = response.json().get("items", [])
            return [
                {
                    "title": item["snippet"]["title"],
                    "description": item["snippet"]["description"],
                    "video_id": item["id"]["videoId"],
                    "url": f"https://www.youtube.com/watch?v={item['id']['videoId']}",
                    "thumbnail": item["snippet"]["thumbnails"].get("high", {}).get("url")
                }
                for item in items
            ]
        except requests.exceptions.RequestException as e:
            print(f"Error with YouTube API: {e}")
            return []
        except Exception as e:
            print(f"An unexpected error occurred during YouTube search: {e}")
            return []