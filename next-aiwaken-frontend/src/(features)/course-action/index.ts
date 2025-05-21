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
