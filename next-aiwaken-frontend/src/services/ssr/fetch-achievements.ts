import { TGetUserAchievementsResponse } from "../topic-service";
import { cookies } from "next/headers";
import axios from "axios";

export async function fetchSsrUserAchievements(): Promise<
  TGetUserAchievementsResponse[] | null
> {
  const cookie = await cookies();
  const accessToken = cookie.get("access_token")?.value;

  if (!accessToken) {
    return null;
  }

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/topics/achievements`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response) {
    throw new Error("Failed to fetch user achievements");
  }

  return response.data;
}
