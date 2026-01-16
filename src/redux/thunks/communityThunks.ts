import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { endPoints } from '../../services/endpoints';

// Fetch Community Posts
export const fetchCommunityPosts = createAsyncThunk(
    'community/fetchPosts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(endPoints.COMMUNTY_DATA);
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Failed to fetch community posts');
        }
    }
);

// Fetch User's Posts
export const fetchUserPosts = createAsyncThunk(
    'community/fetchUserPosts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`${endPoints.COMMUNTY_DATA}/user`);
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Failed to fetch user posts');
        }
    }
);

// Create Post
export const createPost = createAsyncThunk(
    'community/createPost',
    async (postData: unknown, { rejectWithValue }) => {
        try {
            const response = await api.post(endPoints.COMMUNTY_DATA, postData);
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Failed to create post');
        }
    }
);

// Like Post
export const likePost = createAsyncThunk(
    'community/likePost',
    async (postId: string, { rejectWithValue }) => {
        try {
            const response = await api.post(`${endPoints.COMMUNITY_LIKE_DISLIKE}/${postId}`);
            return { postId, ...response.data };
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Failed to like post');
        }
    }
);

// Comment on Post
export const commentOnPost = createAsyncThunk(
    'community/commentOnPost',
    async ({ postId, comment }: { postId: string; comment: string }, { rejectWithValue }) => {
        try {
            const response = await api.post(`${endPoints.COMMUNTY_COMMENT}/${postId}`, { comment });
            return { postId, ...response.data };
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Failed to comment');
        }
    }
);

// Delete Post
export const deletePost = createAsyncThunk(
    'community/deletePost',
    async (postId: string, { rejectWithValue }) => {
        try {
            const response = await api.delete(`${endPoints.COMMUNTY_DATA}/${postId}`);
            return { postId, ...response.data };
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || 'Failed to delete post');
        }
    }
);
