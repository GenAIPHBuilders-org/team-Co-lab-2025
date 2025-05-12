import AuthService from "@/services/auth-services";
import { useMutation } from "@tanstack/react-query";

export const useRegistration = () => {
  const {
    mutateAsync: registerCb,
    isPending: isLoading,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: async (data: TRegistration) => {
      const response = await AuthService.register(data);
      return response;
    },
    onSuccess: (data) => {
      console.log("Registration successful", data);
    },
    onError: (error) => {
      console.error("Registration failed", error);
    },
  });
  return { registerCb, isLoading, isError, isSuccess };
};

export const useLogin = () => {
  const {
    mutateAsync: loginCb,
    isPending: isLoading,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: async (data: TLogin) => {
      const response = await AuthService.login(data);
      return response;
    },
    onSuccess: (data) => {
      console.log("Login successful", data);
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });
  return { loginCb, isLoading, isError, isSuccess };
};

export const useSetUserStatus = () => {
  const {
    mutateAsync: setUserStatusCb,
    isPending: isLoading,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: async () => {
      const response = await AuthService.setIsNewUser();
      return response;
    },
    onSuccess: () => {
      console.log("User status updated successfully");
    },
    onError: (error) => {
      console.error("Failed to update user status", error);
    },
  });
  return { setUserStatusCb, isLoading, isError, isSuccess };
};
