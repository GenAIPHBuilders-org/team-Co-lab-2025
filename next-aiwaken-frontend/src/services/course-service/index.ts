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
}

export default CourseService;
