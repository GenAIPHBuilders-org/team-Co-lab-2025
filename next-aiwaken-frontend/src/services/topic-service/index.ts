import ApiService from "../api-services";

export type TGetAllTopicResponse = {
  topics: TTopics[];
  total: number;
};

export type TTopics = {
  id: string;
  name: string;
  icon: string;
  color: string;
  difficulty: string;
  description: string;
  rewards: string[];
  min_level_required: number;
  created_at: string;
  updated_at: string;
  locked: boolean;
  completion_percentage: number;
  is_completed: boolean;
};

export type TGetUserAchievementsResponse = {
  id: string;
  user_id: string;
  achievement_id: string;
  achievement_progress: number;
  achievement_title: string;
  achievement_description: string;
  achievement_icon: string;
};

export type TStartCourseResponse = {
  id: string;
  topic_id: string;
  topic_name: string;
  is_completed: boolean;
  completion_percentage: number;
  started_at: string;
  completed_at: string;
  last_accessed: string;
};

class TopicService {
  public static async fetchAllTopics(
    skip = 0,
    limit = 100
  ): Promise<TGetAllTopicResponse> {
    return await ApiService.get(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/topics?skip=${skip}&limit=${limit}`
    );
  }

  public static async fetchUserAchievements(): Promise<
    TGetUserAchievementsResponse[]
  > {
    return await ApiService.get(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/topics/achievements`
    );
  }

  public static async updateCourseProgress(
    topic_id: string,
    completion_percentage: number
  ): Promise<void> {
    return await ApiService.put(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/topics/${topic_id}/progress`,
      {
        completion_percentage,
      }
    );
  }

  public static async startCourse(
    topic_id: string
  ): Promise<TStartCourseResponse> {
    return await ApiService.post(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/topics/${topic_id}/start`
    );
  }

  public static async getAllCompletedTopic(): Promise<TGetAllTopicResponse> {
    return await ApiService.get("/v1/topics/completed");
  }
}

export default TopicService;
