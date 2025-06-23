import CompanionService from "@/services/companion-service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCompanionDetails = () => {
  const { data, isPending, isError } = useQuery<CompanionsData>({
    queryKey: ["fetchCompanionDetails"],
    queryFn: async () => {
      const response = await CompanionService.getCompanions();
      return response;
    },
  });
  return {
    data,
    isPending,
    isError,
  };
};

export const useGetHint = () => {
  const {
    mutate: getHint,
    mutateAsync: getHintAsync,
    data,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation<
    HintResponse,
    Error,
    { quiz_question: string; topic_title: string }
  >({
    mutationFn: async (params) => {
      const response = await CompanionService.getHint(
        params.quiz_question,
        params.topic_title
      );
      return response;
    },
    onSuccess: (data) => {
      console.log("Hint fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching hint:", error.message);
    },
  });

  return {
    getHint,
    getHintAsync,
    data,
    isPending,
    isSuccess,
    isError,
    error,
  };
};
export const useGetMotivation = () => {
  const {
    mutate: getMotivation,
    mutateAsync: getMotivationAsync,
    data,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation<
    MotivationResponse,
    Error,
    { subject: string; companion_name: string }
  >({
    mutationFn: async (params) => {
      const response = await CompanionService.getMotivation(
        params.subject,
        params.companion_name
      );
      return response;
    },
    onSuccess: (data) => {
      console.log("Motivation fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching motivation:", error.message);
    },
  });

  return {
    getMotivation,
    getMotivationAsync,
    data,
    isPending,
    isSuccess,
    isError,
    error,
  };
};
export const useGetTips = () => {
  const {
    mutate: getTips,
    mutateAsync: getTipsAsync,
    data,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation<TipsResponse, Error, CompanionTipsParams>({
    mutationFn: async (params: CompanionTipsParams) => {
      const response = await CompanionService.getTips(params);
      return response;
    },
    onSuccess: (data) => {
      console.log("Tips fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching tips:", error.message);
    },
  });

  return {
    getTips,
    getTipsAsync,
    data,
    isPending,
    isSuccess,
    isError,
    error,
  };
};

export const useGetCourseSuggestion = () => {
  const { data, isLoading, error } = useQuery<AICourseSuggestionResponse>({
    queryKey: ["course-suggestion"],
    queryFn: async () => {
      const response = await CompanionService.getCourseSuggestion();
      return response;
    },
  });
  return {
    courseSuggestion: data,
    isLoading,
    error,
  };
};
