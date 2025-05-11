import ApiService from "../api-services";

class AuthService {
    public static async register(data: TRegistration): Promise<TRegistration> {
        return await ApiService.post<TRegistration>("/v1/authentication/register", data);
    }

    public static async login(data: TLogin): Promise<TLogin> {
        return await ApiService.post<TLogin>("/v1/authentication/login", data);
    }
}

export default AuthService;