import { createSlice } from '@reduxjs/toolkit';
import type { CommunityPost, Comment } from '../types';

interface CommunityState {
    isLoading: boolean;
    communityData: CommunityPost[];
    userCommunity: CommunityPost[];
    isPostDeleted: boolean;
    uplaodMedia: Record<string, unknown>;
    isPostModified: boolean;
    postComments: Comment[];
}

const initialState: CommunityState = {
    isLoading: false,
    communityData: [],
    userCommunity: [],
    isPostDeleted: false,
    uplaodMedia: {},
    isPostModified: false,
    postComments: [],
};

const communitySlice = createSlice({
    name: 'community',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        setCommunity(state, action) {
            state.communityData = action.payload;
        },
        setUserCommunity(state, action) {
            state.userCommunity = action.payload;
        },
        uploadMedia(state, action) {
            state.uplaodMedia = action.payload;
        },
        setPostDelete(state, action) {
            state.isPostDeleted = action.payload;
        },
        setPostEdited(state, action) {
            state.isPostModified = action.payload;
        },
        setPostComments(state, action) {
            state.postComments = action.payload;
        },
    },
});

export const communityAction = communitySlice.actions;
export default communitySlice.reducer;
