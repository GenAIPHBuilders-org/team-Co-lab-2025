import { TExtendedUser } from "@/types/user";
import { cookies } from "next/headers";

export async function getServerAuthSession(): Promise<TExtendedUser | null> {
  const cookie = await cookies();
  const accessToken = cookie.get("access_token")?.value;

  if (!accessToken) {
    return null;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/authentication/tokenized-user`,
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
