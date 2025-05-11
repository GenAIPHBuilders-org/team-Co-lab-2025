import AuthService from "@/services/auth-services";
import { useMutation } from "@tanstack/react-query"

export const useRegistration = () => {
    const { mutateAsync: registerCb, isPending: isLoading, isError, isSuccess } = useMutation({
        mutationFn: async (data: IRegistration) => {
            const response = await AuthService.register(data);
            return response;
        },
        onSuccess: (data) => {
            console.log("Registration successful", data);
        },
        onError: (error) => {
            console.error("Registration failed", error);
        }
    });
    return { registerCb, isLoading, isError, isSuccess };
}