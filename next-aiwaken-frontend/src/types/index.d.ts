export { }

declare global {
    type TRegistration = {
        email: string;
        username: string;
        password: string;
    }

    type TLogin = {
        username: string;
        password: string;
        accessToken?: string;
    }

    type TUser = {
        user: {
            id: number;
            username: string;
            email: string;
            is_active: boolean;
        }
        accessToken?: string;
        token_type?: string;
    }

    type TAuthContextValue = {
        user: TUser | null;
        login: (username: string, password: string) => Promise<void>;
        handleLogout: () => void;
    }
}