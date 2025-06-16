class TokenServices {
    private static instance: TokenServices;
    
    private constructor() {}
    
    public static getInstance(): TokenServices {
        if (!TokenServices.instance) {
        TokenServices.instance = new TokenServices();
        }
        return TokenServices.instance;
    }
    
    public getToken(): string | null {
        if (typeof window === 'undefined') {
            return null
        }
        return localStorage.getItem('access_token');
    }
    
    public setToken(token: string): void {
        localStorage.setItem('access_token', token);
    }
    
    public removeToken(): void {
        localStorage.removeItem('access_token');
    }
}

export default TokenServices.getInstance();