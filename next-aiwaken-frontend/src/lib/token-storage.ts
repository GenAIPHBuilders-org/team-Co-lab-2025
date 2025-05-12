import Cookies from "js-cookie";

export class TokenStorage {
  static getAccessToken(): string | null {
    return (
      localStorage.getItem("access_token") ||
      Cookies.get("access_token") ||
      null
    );
  }

  static setAccessToken(token: string): void {
    localStorage.setItem("access_token", token);
    Cookies.set("access_token", token, { expires: 7 });
  }

  static removeAccessToken(): void {
    localStorage.removeItem("access_token");
    Cookies.remove("access_token");
  }

  static setNewUser(): void {
    localStorage.setItem("new_user", "true");
  }
}