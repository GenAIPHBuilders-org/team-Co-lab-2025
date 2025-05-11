"use client"
import { TokenStorage } from "@/lib/token-storage";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

type AuthProps = {
    initialUser: TUser | null;
    children: React.ReactNode;
}

const AuthenticationContext = createContext<TAuthContextValue>({
    user: null,
    login: async () => {},
})

export const useAuthentication = () => {
    if (!AuthenticationContext) {
        throw new Error("useAuthentication must be used within an AuthenticationProvider");
    }

    return useContext(AuthenticationContext);
}

export const AuthenticationProvider = ({initialUser, children}: AuthProps) => {
    const router = useRouter();
    const [user, setUser] = useState<TUser | null>(initialUser);

    async function login(username: string, password: string) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/authentication/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                }
            )
            const data = await response.json();

            if (response.ok) {
                setUser({
                    user: {
                        id: data.user.id,
                        username: data.user.username,
                        email: data.user.email,
                        is_active: data.user.is_active,
                    },
                })
                TokenStorage.setAccessToken(data.access_token);
                document.cookie = `access_token=${data.access_token}; path=/; max-age=3600;`;
                router.push("/dashboard");
            } else {
                console.error("Login failed", data);
            }
        } catch (error) {
            console.error("Login failed", error);
         }
    }

    return (
        <AuthenticationContext.Provider value={{
            user,
            login,

        }}>
            {children}
        </AuthenticationContext.Provider>
    )
}