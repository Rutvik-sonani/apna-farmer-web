import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { endPoints } from '../../services/endpoints';

// Fetch Buyers
export const fetchBuyers = createAsyncThunk(
    'buyers/fetchBuyers',
    async (filters: Record<string, unknown> = {}, { rejectWithValue }) => {
        try {
            const response = await api.get(endPoints.BUYERS_GET, { params: filters });
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Failed to fetch buyers');
        }
    }
);

// Fetch Agro Shops
export const fetchAgroShops = createAsyncThunk(
    'agroshop/fetchShops',
    async (filters: Record<string, unknown> = {}, { rejectWithValue }) => {
        try {
            const response = await api.get(endPoints.AGRO_GET, { params: filters });
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Failed to fetch agro shops');
        }
    }
);

// Add to Favorites
export const addToFavorites = createAsyncThunk(
    'favorites/add',
    async ({ type, itemId }: { type: string; itemId: string }, { rejectWithValue }) => {
        try {
            const response = await api.post(endPoints.FAVOURITE, { type, itemId });
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Failed to add to favorites');
        }
    }
);

// Remove from Favorites
export const removeFromFavorites = createAsyncThunk(
    'favorites/remove',
    async (itemId: string, { rejectWithValue }) => {
        try {
            const response = await api.delete(`${endPoints.FAVOURITE}/${itemId}`);
            return { itemId, ...response.data };
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Failed to remove from favorites');
        }
    }
);

// Fetch Favorites
export const fetchFavorites = createAsyncThunk(
    'favorites/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(endPoints.FAVOURITE);
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Failed to fetch favorites');
        }
    }
);
