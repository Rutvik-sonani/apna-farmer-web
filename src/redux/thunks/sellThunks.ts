import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { endPoints } from '../../services/endpoints';

// Post Crop for Sale
export const postCrop = createAsyncThunk(
    'sell/postCrop',
    async (cropData: unknown, { rejectWithValue }) => {
        try {
            const response = await api.post(endPoints.SELL_CROP, cropData);
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Failed to post crop');
        }
    }
);

// Update Crop
export const updateCrop = createAsyncThunk(
    'sell/updateCrop',
    async ({ id, data }: { id: string; data: unknown }, { rejectWithValue }) => {
        try {
            const response = await api.put(`${endPoints.SELL_CROP}/${id}`, data);
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Failed to update crop');
        }
    }
);

// Delete Crop
export const deleteCrop = createAsyncThunk(
    'sell/deleteCrop',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await api.delete(`${endPoints.SELL_CROP}/${id}`);
            return { id, ...response.data };
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Failed to delete crop');
        }
    }
);

// Fetch My Crops
export const fetchMyCrops = createAsyncThunk(
    'sell/fetchMyCrops',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`${endPoints.SELL_CROP}/my-crops`);
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Failed to fetch my crops');
        }
    }
);

// Fetch All Crops (Marketplace)
export const fetchAllCrops = createAsyncThunk(
    'sell/fetchAllCrops',
    async (filters: Record<string, unknown> = {}, { rejectWithValue }) => {
        try {
            const response = await api.get(endPoints.SELL_CROP, { params: filters });
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Failed to fetch crops');
        }
    }
);

// Fetch Crop Details
export const fetchCropDetails = createAsyncThunk(
    'sell/fetchCropDetails',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await api.get(`${endPoints.SELL_CROP}/${id}`);
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Failed to fetch crop details');
        }
    }
);

// Upload Images
export const uploadCropImages = createAsyncThunk(
    'sell/uploadImages',
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const response = await api.post(endPoints.IMAGE_UPLOAD_Bulk, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Failed to upload images');
        }
    }
);
