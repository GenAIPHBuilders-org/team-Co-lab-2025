import CourseService from "@/services/course-service";
import { useMutation } from "@tanstack/react-query";

export const useGenerateCourse = () => {
  const { mutate, mutateAsync, data, isPending, isSuccess, isError, error } =
    useMutation<CourseOutline, Error, { subject: string; difficulty: string }>({
      mutationFn: async ({
        subject,
        difficulty,
      }: {
        subject: string;
        difficulty: string;
      }): Promise<CourseOutline> => {
        const response = await CourseService.generateCourse(
          subject,
          difficulty
        );
        return response;
      },
      onSuccess: (data) => {
        console.log("Course generated successfully:", data);
        localStorage.setItem("generatedCourse", JSON.stringify(data));
        window.location.reload();
      },
      onError: (error) => {
        console.error("Error generating course:", error.message);
      },
    });

  return {
    generateCourse: mutate,
    generateCourseAsync: mutateAsync,
    data,
    isPending,
    isSuccess,
    isError,
    error,
  };
};

export const useGetLearningStepContent = () => {
  const { mutate, mutateAsync, data, isPending, isSuccess, isError, error } =
    useMutation<LearningStepContentResponse, Error, LearningStepContentParams>({
      mutationFn: async (params: LearningStepContentParams) => {
        const response = await CourseService.getLearningStepContent(params);
        return response;
      },
      onSuccess: (data) => {
        console.log("Learning step content fetched successfully:", data);
      },
      onError: (error) => {
        console.error("Error fetching learning step content:", error.message);
      },
    });

  return {
    getLearningStepContent: mutate,
    getLearningStepContentAsync: mutateAsync,
    data,
    isPending,
    isSuccess,
    isError,
    error,
  };
};
export const useGetCourseSummaryConclusion = () => {
  const { mutate, mutateAsync, data, isPending, isSuccess, isError, error } =
    useMutation<CourseConclusion, Error, CourseConclusionParams>({
      mutationFn: async (params: CourseConclusionParams) => {
        const response = await CourseService.getCourseSummaryConclusion(params);
        return response;
      },
      onSuccess: (data) => {
        console.log("Course summary conclusion fetched successfully:", data);
        localStorage.setItem("courseSummaryConclusion", JSON.stringify(data));
      },
      onError: (error) => {
        console.error(
          "Error fetching course summary conclusion:",
          error.message
        );
      },
    });

  return {
    getCourseSummaryConclusion: mutate,
    getCourseSummaryConclusionAsync: mutateAsync,
    data,
    isPending,
    isSuccess,
    isError,
    error,
  };
};

export const useGetLearningStepQuiz = () => {
  const { mutate, mutateAsync, data, isPending, isSuccess, isError, error } =
    useMutation<LearningStepQuizResponse, Error, LearningStepQuizParams>({
      mutationFn: async (params: LearningStepQuizParams) => {
        const response = await CourseService.getLearningStepQuiz(params);
        return response;
      },
      onSuccess: (data) => {
        console.log("Learning step quiz fetched successfully:", data);
        localStorage.setItem("learningStepQuiz", JSON.stringify(data));
      },
      onError: (error) => {
        console.error("Error fetching learning step quiz:", error.message);
      },
    });
  return {
    getLearningStepQuiz: mutate,
    getLearningStepQuizAsync: mutateAsync,
    data,
    isPending,
    isSuccess,
    isError,
    error,
  };
};
