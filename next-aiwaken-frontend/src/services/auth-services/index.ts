import ApiService from "../api-services";

class AuthService {
  public static async register(data: TRegistration): Promise<TRegistration> {
    return await ApiService.post<TRegistration>(
      "/v1/authentication/register",
      data
    );
  }

  public static async login(data: TLogin): Promise<TLogin> {
    return await ApiService.post<TLogin>("/v1/authentication/login", data);
  }

  public static async setIsNewUser(): Promise<void> {
    return await ApiService.post<void>(
      "/v1/authentication/set-new-user-status"
    );
  }
}

export default AuthService;