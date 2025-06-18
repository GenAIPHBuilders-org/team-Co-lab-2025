export type TDailyRewardResponse = {
  rewards: TDailyRewardData[];
  current_streak: number;
  can_claim: boolean;
};

export type TDailyRewardData = {
  day: number;
  reward: string;
  type: string;
  is_claimed: boolean;
  icon: "heart" | "coin" | "xp";
};
