import { IBossBattleAIGeneratedQuestion } from "@/app/dashboard/boss-battle/constant";
import ApiService from "../api-services";

class CourseService {
  public static async generateCourse(
    subject: string,
    difficulty: string
  ): Promise<CourseOutline> {
    return await ApiService.post<CourseOutline>(
      "/v1/companion/course/structure",
      {
        subject,
        difficulty,
      }
    );
  }

  public static async getLearningStepContent(
    params: LearningStepContentParams
  ): Promise<LearningStepContentResponse> {
    return await ApiService.get<LearningStepContentResponse>(
      "/v1/companion/course/learning_step_content",
      params
    );
  }

  public static async getLearningStepQuiz(
    params: LearningStepQuizParams
  ): Promise<LearningStepQuizResponse> {
    return await ApiService.get<LearningStepQuizResponse>(
      "/v1/companion/course/learning_step_quiz",
      params
    );
  }

  public static async getCourseSummaryConclusion(): Promise<IBossBattleAIGeneratedQuestion> {
    return await ApiService.get<IBossBattleAIGeneratedQuestion>(
      "/v1/companion/boss/prompt"
    );
  }
}

export default CourseService;
