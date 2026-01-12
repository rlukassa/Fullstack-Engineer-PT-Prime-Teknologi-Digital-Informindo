import api from './api';

interface AuthResponse {
    success: boolean;
    data?: any;
    message?: string;
}

export const authService = {
    async login(email: string, password: string): Promise<AuthResponse> {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, userId } = response.data;            
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            return { success: true, data: response.data };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login Failed'
            };
        }
    },

    async register(username: string, email: string, password: string): Promise<AuthResponse> {
        try {
            const response = await api.post('/auth/register', { 
                username, 
                email, 
                password 
            });
            const { token, userId } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            return { success: true, data: response.data };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || 'Register Failed'
            };
        }
    },

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    },

    getToken(): string | null {
        return localStorage.getItem('token');
    },

    getUserId(): string | null {
        return localStorage.getItem('userId');
    }
};

export default authService;
