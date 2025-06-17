import { useMutation } from "@tanstack/react-query";
import PreferenceService from "@/services/preference-service";
import { TUserPreferenceValues } from "@/types/preferences";

export const useStoreUserPreferences = () => {
  const { mutate, mutateAsync, data, isPending, isSuccess, isError, error } =
    useMutation<TUserPreferenceValues, Error, TUserPreferenceValues>({
      mutationFn: async (
        data: TUserPreferenceValues
      ): Promise<TUserPreferenceValues> => {
        const response = await PreferenceService.storeUserPreferences(data);
        return response as TUserPreferenceValues;
      },
      onError: (error) => {
        console.error("Error storing preferences:", error.message);
      },
    });

  return {
    storePreferences: mutate,
    storePreferencesAsync: mutateAsync,
    data,
    isPending,
    isSuccess,
    isError,
    error,
  };
};
