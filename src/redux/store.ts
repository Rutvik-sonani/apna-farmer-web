import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import homeReducer from './dashboardSlice';
import communityReducer from './communitySlice';
import profileReducer from './profileSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        home: homeReducer,
        community: communityReducer,
        profile: profileReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
