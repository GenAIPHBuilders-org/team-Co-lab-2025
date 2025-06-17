import { TUserPreferenceValues } from "@/types/preferences";
import ApiService from "../api-services";

class PreferenceService {
  public static async storeUserPreferences(data: TUserPreferenceValues) {
    return await ApiService.post("/v1/preferences", data);
  }
}

export default PreferenceService;
