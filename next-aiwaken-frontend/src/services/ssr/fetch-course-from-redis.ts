import { AIContentGenerationResponse } from "@/types/course";
import RedisService from "../redis-service";

export default async function fetchUserCourseFromRedisCache(): Promise<AIContentGenerationResponse | null> {
  const response = await RedisService.fetchUserCourse();

  if (!response) {
    return null;
  }

  return response;
}
