"use server";
import { TDailyRewardResponse } from "@/types/services";
import { cookies } from "next/headers";

export async function fetchDailyRewards(): Promise<TDailyRewardResponse | null> {
  const cookie = await cookies();
  const accessToken = cookie.get("access_token")?.value;

  if (!accessToken) {
    return null;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/daily-rewards`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data;
}
