"use server";
import { cookies } from "next/headers";
import axios from "axios";
import { AIContentGenerationResponse } from "@/types/course";

export async function fetchSsrUserCourse(): Promise<AIContentGenerationResponse | null> {
  const cookie = await cookies();
  const accessToken = cookie.get("access_token")?.value;

  if (!accessToken) {
    return null;
  }

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/companion/course/structure/cache`,
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
