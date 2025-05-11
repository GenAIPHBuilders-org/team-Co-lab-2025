import ApiService from "../api-services";

class AuthService {
    public static async register(data: IRegistration): Promise<IRegistration> {
        return await ApiService.post<IRegistration>("/v1/authentication/register", data);
    }
}

export default AuthService;