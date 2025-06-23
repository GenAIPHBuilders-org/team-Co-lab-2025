import ApiService from "../api-services";

class CompanionService {
  public static async getCompanions(): Promise<CompanionsData> {
    return await ApiService.get<CompanionsData>(
      "v1/companion/companion/details"
    );
  }

  public static async getHint(
    quiz_question: string,
    topic_title: string
  ): Promise<HintResponse> {
    return await ApiService.post<HintResponse>("v1/companion/hint", {
      quiz_question,
      topic_title,
    });
  }

  public static async getMotivation(
    subject: string,
    companion_name: string
  ): Promise<MotivationResponse> {
    return await ApiService.get<MotivationResponse>(
      "v1/companion/course/quiz_motivation",
      {
        subject,
        companion_name,
      }
    );
  }

  public static async getTips(
    params: CompanionTipsParams
  ): Promise<TipsResponse> {
    return await ApiService.get<TipsResponse>("v1/companion/course/tips", {
      subject: params.subject,
      topic_title: params.topic_title,
      step_title: params.step_title,
      difficulty: params.difficulty,
    });
  }

  public static async getCourseSuggestion(): Promise<AICourseSuggestionResponse> {
    return await ApiService.get("/v1/companion/course/suggestion");
  }
}

export default CompanionService;
