import { createSlice } from '@reduxjs/toolkit';
import type { AuthData, LatLog } from '../types';

interface AuthState {
    isloading: boolean;
    authData: AuthData | null;
    authError: string;
    otpError: string;
    appIP: string;
    timer: number;
    contactUS: string;
    aboutUs: string;
    latLog: LatLog;
}

const initialState: AuthState = {
    isloading: false,
    authData: null,
    authError: '',
    otpError: '',
    appIP: '',
    timer: 60,
    contactUS: '',
    aboutUs: '',
    latLog: {},
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loadigData(state, action) {
            state.isloading = action.payload;
        },
        errorAuth(state, action) {
            state.authError = action.payload;
        },
        errorOtp(state, action) {
            state.otpError = action.payload;
        },
        setAppIP(state, action) {
            state.appIP = action.payload;
        },
        setTimer(state, action) {
            state.timer = typeof action.payload === 'object' ? action.payload.data : action.payload;
        },
        fetchAuth(state, action) {
            state.authData = action.payload;
        },
        setAuthToken(state, action) {
            // Store token in authData if needed
            if (state.authData) {
                state.authData.token = action.payload;
            }
        },
        logout(state) {
            state.authData = null;
            state.authError = '';
            state.otpError = '';
            state.timer = 60;
        },
        contactUs(state, action) {
            state.contactUS = action.payload;
        },
        aboutUs(state, action) {
            state.aboutUs = action.payload;
        },
        latLog(state, action) {
            state.latLog = action.payload;
        },
    },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
