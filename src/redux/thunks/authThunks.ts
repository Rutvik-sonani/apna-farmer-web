import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { endPoints } from '../../services/endpoints';

// Login
export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: { mobile: string }, { rejectWithValue }) => {
        try {
            const response = await api.post(endPoints.Login, credentials);
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Login failed');
        }
    }
);

// Verify OTP
export const verifyOTP = createAsyncThunk(
    'auth/verifyOTP',
    async (data: { mobile: string; otp: string; userType: string }, { rejectWithValue }) => {
        try {
            const response = await api.post(endPoints.VERIFY_OTP, data);
            // Store token
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
            }
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'OTP verification failed');
        }
    }
);

// Resend OTP
export const resendOTP = createAsyncThunk(
    'auth/resendOTP',
    async (mobile: string, { rejectWithValue }) => {
        try {
            const response = await api.post(endPoints.OTP_GENERATE, { mobile });
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Failed to resend OTP');
        }
    }
);

// Logout
export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            localStorage.removeItem('authToken');
            return { success: true };
        } catch (error: unknown) {
            const err = error as { message?: string };
            return rejectWithValue(err.message || 'Logout failed');
        }
    }
);
