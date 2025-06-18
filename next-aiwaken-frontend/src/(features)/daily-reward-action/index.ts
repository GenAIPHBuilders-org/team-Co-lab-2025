import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import DailyRewardsService from "@/services/daily-rewards-service";

export const useFetchDailyRewards = () => {
  const { data, isLoading, isError, error } = useSuspenseQuery({
    queryKey: ["daily-rewards"],
    queryFn: () => DailyRewardsService.getDailyRewards(),
  });

  return { data, isLoading, isError, error };
};

export const useClaimDailyReward = () => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, isSuccess, isError, error } =
    useMutation({
      mutationFn: () => DailyRewardsService.claimDailyReward(),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["daily-rewards"] });
      },
      onError: (error) => {
        console.error("Error claiming daily reward:", error.message);
      },
    });

  return {
    claimDailyReward: mutate,
    claimDailyRewardAsync: mutateAsync,
    isPending,
    isSuccess,
    isError,
    error,
  };
};
