import { createSlice } from '@reduxjs/toolkit';
import type { Profile } from '../types';

interface ProfileState {
    isLoading: boolean;
    profileData: Profile | null;
    isProfileUpdated: boolean;
}

const initialState: ProfileState = {
    isLoading: false,
    profileData: null,
    isProfileUpdated: false,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        setProfileData(state, action) {
            state.profileData = action.payload;
        },
        setProfileUpdated(state, action) {
            state.isProfileUpdated = action.payload;
        },
    },
});

export const profileAction = profileSlice.actions;
export default profileSlice.reducer;
