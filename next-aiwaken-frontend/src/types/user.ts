import { TUserPreferenceValues } from "./preferences";

export type TExtendedUser = TUser & {
  preferences: TUserPreferenceValues;
  stats: TUserStats;
};

export type TUserStats = {
  streak: number;
  coins: number;
  experience: number;
  level: number;
  heart: number;
  daily_check_in: Date;
  experience_to_next_level: number;
};
