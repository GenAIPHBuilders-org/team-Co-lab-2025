import { AIContentGenerationResponse } from "@/types/course";
import ApiService from "../api-services";

class RedisService {
  public static async fetchUserCourse(): Promise<AIContentGenerationResponse> {
    return await ApiService.get("/v1/companion/course/structure/cache");
  }
}

export default RedisService;
