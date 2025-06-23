"use server";
import axios from "axios";
import { cookies } from "next/headers";

export async function fetchSsrCourseSuggestion(): Promise<AICourseSuggestionResponse | null> {
  const cookie = await cookies();
  const accessToken = cookie.get("access_token")?.value;

  if (!accessToken) {
    return null;
  }

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/companion/course/suggestion`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response) {
    return null;
  }

  return response.data;
}
