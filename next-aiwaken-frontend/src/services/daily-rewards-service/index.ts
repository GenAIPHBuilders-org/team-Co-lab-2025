import { TDailyRewardResponse } from "@/types/services";
import ApiService from "../api-services";

class DailyRewardsService {
  public static async getDailyRewards(): Promise<TDailyRewardResponse> {
    return await ApiService.get("/v1/daily-rewards");
  }

  public static async claimDailyReward(): Promise<string> {
    return await ApiService.post("/v1/daily-rewards/claim");
  }
}

export default DailyRewardsService;
