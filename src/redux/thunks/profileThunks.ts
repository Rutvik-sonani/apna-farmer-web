import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { endPoints } from '../../services/endpoints';

// Fetch Profile
export const fetchProfile = createAsyncThunk(
    'profile/fetchProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(endPoints.USER_DATA);
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Failed to fetch profile');
        }
    }
);

// Update Basic Profile
export const updateBasicProfile = createAsyncThunk(
    'profile/updateBasic',
    async (profileData: unknown, { rejectWithValue }) => {
        try {
            const response = await api.put(endPoints.USER_DATA, profileData);
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Failed to update profile');
        }
    }
);

// Update Farmer Profile
export const updateFarmerProfile = createAsyncThunk(
    'profile/updateFarmer',
    async (farmerData: unknown, { rejectWithValue }) => {
        try {
            const response = await api.put(`${endPoints.USER_DATA}/farmer`, farmerData);
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Failed to update farmer profile');
        }
    }
);

// Update Buyer Profile
export const updateBuyerProfile = createAsyncThunk(
    'profile/updateBuyer',
    async (buyerData: unknown, { rejectWithValue }) => {
        try {
            const response = await api.put(`${endPoints.USER_DATA}/buyer`, buyerData);
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Failed to update buyer profile');
        }
    }
);

// Upload Profile Picture
export const uploadProfilePicture = createAsyncThunk(
    'profile/uploadPicture',
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const response = await api.post(endPoints.IMAGE_UPLOAD, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Failed to upload picture');
        }
    }
);
