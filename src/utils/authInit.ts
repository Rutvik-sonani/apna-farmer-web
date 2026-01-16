import { store } from '../redux/store';
import { authAction } from '../redux/authSlice';
import { localDb } from '../services/endpoints';

export const initializeAuth = () => {
    try {
        // Check localStorage for auth data
        const authStorage = localStorage.getItem(localDb.AUTH);
        const token = localStorage.getItem(localDb.LOGIN_TOKEN);

        if (authStorage) {
            try {
                const authData = JSON.parse(authStorage);
                // Restore auth data to Redux store
                store.dispatch(authAction.fetchAuth(authData));
            } catch (e) {
                console.error('Error parsing auth data:', e);
            }
        }

        // If we have a token but no authData, we might want to fetch user data
        // For now, we'll just ensure the token is available
        if (token && !authStorage) {
            // Token exists but no full auth data - could fetch user data here
            console.log('Token found but no auth data');
        }
    } catch (error) {
        console.error('Error initializing auth:', error);
    }
};

