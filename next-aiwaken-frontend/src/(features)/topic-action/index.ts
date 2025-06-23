import TopicService, { TGetAllTopicResponse } from "@/services/topic-service";
import { useSuspenseQuery } from "@tanstack/react-query";

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
