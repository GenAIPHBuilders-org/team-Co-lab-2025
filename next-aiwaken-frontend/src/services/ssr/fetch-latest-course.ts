"use server";
import { cookies } from "next/headers";
import { TTopics } from "../topic-service";

export async function fetchLatestUserTopics(): Promise<TTopics | null> {
  const cookie = await cookies();
  const accessToken = cookie.get("access_token")?.value;

  if (!accessToken) {
    return null;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/topics/latest`,
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
