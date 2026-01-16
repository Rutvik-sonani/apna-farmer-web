import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { endPoints } from '../../services/endpoints';

// Fetch Categories
export const fetchCategories = createAsyncThunk(
    'dashboard/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(endPoints.CROP_CATEGORY);
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Failed to fetch categories');
        }
    }
);

// Fetch Crop Names by Category
export const fetchCropNames = createAsyncThunk(
    'dashboard/fetchCropNames',
    async (categoryId: string, { rejectWithValue }) => {
        try {
            const response = await api.get(`${endPoints.CROP_NAME}?category=${categoryId}`);
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Failed to fetch crops');
        }
    }
);

// Fetch Requirements
export const fetchRequirements = createAsyncThunk(
    'dashboard/fetchRequirements',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(endPoints.REQUIREMENTS);
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Failed to fetch requirements');
        }
    }
);

// Fetch User Details
export const fetchUserDetails = createAsyncThunk(
    'dashboard/fetchUserDetails',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(endPoints.USER_DATA);
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Failed to fetch user details');
        }
    }
);
