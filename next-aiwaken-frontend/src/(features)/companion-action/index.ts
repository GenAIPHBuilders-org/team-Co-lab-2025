import CompanionService from "@/services/companion-service";
import { useQuery } from "@tanstack/react-query";

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
