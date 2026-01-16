import axios from 'axios';
import { localDb } from './endpoints';

const api = axios.create({
    baseURL: '/api/',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const authData = localStorage.getItem(localDb.AUTH);
        if (authData) {
            try {
                const parsed = JSON.parse(authData);
                if (parsed?.accessToken) {
                    config.headers.Authorization = `Bearer ${parsed.accessToken}`;
                }
            } catch {
                // If simple string
                config.headers.Authorization = `Bearer ${authData}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => {
        // Return the data directly (matching React Native structure)
        return response.data;
    },
    (error) => {
        // Handle global errors
        console.error('API Error:', error);
        if (error.response && error.response.data) {
            const errorData = error.response.data;
            // Show error toast if needed
            if (errorData?.error && errorData?.message !== "Jwt must be provided") {
                // You can dispatch a toast action here if you have a toast system
                console.error('API Error:', errorData.error);
            }
            return Promise.reject(errorData);
        }
        return Promise.reject(error);
    }
);

// Define generic API response interface
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
    success?: boolean;
    data?: T;
    message?: string;
    error?: string;
    statusCode?: number;
}

// Server call function matching React Native implementation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serverCall = async <T = any>(url: string, method: string, body?: unknown): Promise<ApiResponse<T>> => {
    try {
        const authData = localStorage.getItem(localDb.AUTH);
        const headers: Record<string, string> = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        if (authData) {
            try {
                const parsed = JSON.parse(authData);
                if (parsed?.accessToken) {
                    headers.Authorization = `Bearer ${parsed.accessToken}`;
                }
            } catch {
                // If simple string
                headers.Authorization = `Bearer ${authData}`;
            }
        }

        const config: Record<string, unknown> = {
            method,
            url,
            headers,
        };

        if (method === 'POST' || method === 'PUT') {
            config.data = body;
        }

        const response = await axios(config);

        // Check status code
        if (response.data?.statusCode !== 200 && response.data?.statusCode !== '200') {
            if (response.data?.message === "Jwt must be provided") {
                // Handle JWT error silently
            } else if (response.data?.error) {
                console.error('API Error:', response.data.error);
            }
        }

        return response.data as ApiResponse<T>;
    } catch (error: unknown) {
        console.error('Server call error:', error);
        // Type guard for axios error
        if (error && typeof error === 'object' && 'response' in error) {
            const axiosError = error as { response?: { data?: unknown } };
            if (axiosError.response?.data) {
                return axiosError.response.data as ApiResponse<T>;
            }
        }
        // Type guard for Error object
        const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
        return { success: false, error: errorMessage };
    }
};

export default api;
