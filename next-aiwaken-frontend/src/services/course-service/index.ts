import ApiService from "../api-services";

class CourseService {
  public static async generateCourse(
    subject: string,
    difficulty: string
  ): Promise<CourseOutline> {
    return await ApiService.get<CourseOutline>(
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

  public static async getCourseSummaryConclusion(
    params: CourseConclusionParams
  ): Promise<CourseConclusion> {
    const query = new URLSearchParams({
      course_title: params.course_title,
      subject: params.subject,
      difficulty: params.difficulty,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sections_data_json: params.sections_data_json as any,
    });

    return await ApiService.post<CourseConclusion>(
      `/v1/companion/course/conclusion?${query.toString()}`
    );
  }
}

export default CourseService;
