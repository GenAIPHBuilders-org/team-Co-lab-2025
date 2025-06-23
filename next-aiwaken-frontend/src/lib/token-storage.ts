import { AIContentGenerationResponse } from "@/types/course";
import Cookies from "js-cookie";

export class TokenStorage {
  static getAccessToken(): string | null {
    return (
      localStorage.getItem("access_token") ||
      Cookies.get("access_token") ||
      null
    );
  }

  static setAccessToken(token: string): void {
    localStorage.setItem("access_token", token);
    Cookies.set("access_token", token, { expires: 7 });
  }

  static removeAccessToken(): void {
    localStorage.removeItem("access_token");
    Cookies.remove("access_token");
  }

  static setNewUser(): void {
    localStorage.setItem("new_user", "true");
  }

  static setUserCompanion(companion: string): void {
    localStorage.setItem("user_companion", companion);
  }

  static getCourseData(): AIContentGenerationResponse | null {
    if (typeof window === "undefined") {
      return null;
    }

    const rawData = localStorage.getItem("generatedCourse");

    if (!rawData || rawData === "undefined") {
      return null;
    }

    try {
      return JSON.parse(rawData);
    } catch (e) {
      console.error("Failed to parse courseData from localStorage:", e);
      return null;
    }
  }

  static getLearningStepQuiz(): QuizData | null {
    if (typeof window === "undefined") {
      return null;
    }

    const data = localStorage.getItem("learningStepQuiz");

    if (!data || data === "undefined") {
      return null;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Failed to parse learningStepQuiz from localStorage:", e);
      return null;
    }
  }
  static getSummaryConclusion(): CourseConclusion | null {
    if (typeof window === "undefined") {
      return null;
    }

    const data = localStorage.getItem("courseSummaryConclusion");

    if (!data || data === "undefined") {
      return null;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Failed to parse courseData from localStorage:", e);
      return null;
    }
  }
}
