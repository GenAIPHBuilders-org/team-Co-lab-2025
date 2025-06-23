import TopicService, {
  TGetAllTopicResponse,
  TGetUserAchievementsResponse,
  TStartCourseResponse,
} from "@/services/topic-service";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";

export const useFetchAllTopics = () => {
  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: ["all-topics"],
    queryFn: async (): Promise<TGetAllTopicResponse> => {
      const response = await TopicService.fetchAllTopics();
      return response;
    },
  });
  return {
    allAvailableTopic: data,
    isLoading,
    error,
  };
};

export const useFetchUserAchievements = () => {
  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: ["user-achievements"],
    queryFn: async (): Promise<TGetUserAchievementsResponse[]> => {
      const response = await TopicService.fetchUserAchievements();
      return response;
    },
  });
  return {
    userAchievements: data,
    isLoading,
    error,
  };
};

export const useUpdateCourseProgress = () => {
  const { mutate, data, isPending, isSuccess, isError, error } = useMutation<
    void,
    Error,
    { topic_id: string; completion_percentage: number }
  >({
    mutationFn: async ({
      topic_id,
      completion_percentage,
    }: {
      topic_id: string;
      completion_percentage: number;
    }) => {
      await TopicService.updateCourseProgress(topic_id, completion_percentage);
    },
    onSuccess: () => {
      console.log("Course progress updated successfully");
    },
    onError: (error) => {
      console.error("Error updating course progress:", error.message);
    },
  });

  return {
    updateCourseProgress: mutate,
    data,
    isPending,
    isSuccess,
    isError,
    error,
  };
};

export const useStartCourse = () => {
  const { mutate, data, isPending, isSuccess, isError, error } = useMutation<
    TStartCourseResponse,
    Error,
    { topic_id: string }
  >({
    mutationFn: async ({ topic_id }: { topic_id: string }) => {
      const response = await TopicService.startCourse(topic_id);
      return response;
    },
    onSuccess: (data) => {
      console.log("Course started successfully:", data);
    },
    onError: (error) => {
      console.error("Error starting course:", error.message);
    },
  });

  return {
    startCourse: mutate,
    data,
    isPending,
    isSuccess,
    isError,
    error,
  };
};

export const useFetchCompletedTopics = () => {
  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: ["completed-topics"],
    queryFn: async (): Promise<TGetAllTopicResponse> => {
      const response = await TopicService.getAllCompletedTopic();
      return response;
    },
  });
  return {
    completedTopics: data,
    isLoading,
    error,
  };
};
