import { endPoints, reqestMethod, localDb } from './endpoints';
import { serverCall, ApiResponse } from './api';
import { getUserIP } from '../utils/getIP';

export interface LoginPayload {
    mobile: string;
    deviceId: string;
    ip: string;
    deviceType: 'WEB' | 'ANDROID' | 'IOS';
    longitude: string;
    latitude: string;
}

export interface OTPVerifyPayload {
    userId: string;
    otp: string;
}

export interface SelectRolePayload {
    userType: string;
}

/**
 * Login/Register user with mobile number
 */
export const login = async (mobile: string): Promise<ApiResponse> => {
    try {
        const ipAddress = await getUserIP();
        const deviceId = localStorage.getItem('deviceId') || `web-${Date.now()}`;

        // Store device ID if not exists
        if (!localStorage.getItem('deviceId')) {
            localStorage.setItem('deviceId', deviceId);
        }

        const body: LoginPayload = {
            mobile: mobile,
            deviceId: deviceId,
            ip: ipAddress,
            deviceType: 'WEB',
            longitude: '79.05139336503765', // Default coordinates
            latitude: '21.15667986677371',
        };

        const result = await serverCall(endPoints.Login, reqestMethod.POST, body);
        return result;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

/**
 * Generate OTP for user
 */
export const generateOTP = async (userId: string): Promise<ApiResponse> => {
    try {
        const body = {
            userId: userId,
        };
        const result = await serverCall(endPoints.OTP_GENERATE, reqestMethod.POST, body);
        return result;
    } catch (error) {
        console.error('Generate OTP error:', error);
        throw error;
    }
};

/**
 * Verify OTP - with default 1111 support
 */
export const verifyOTP = async (userId: string, otp: string): Promise<ApiResponse> => {
    try {
        // Use default OTP 1111 if provided or if otp is empty
        const otpToUse = otp || '1111';

        const body: OTPVerifyPayload = {
            userId: userId,
            otp: otpToUse,
        };

        const result = await serverCall(endPoints.VERIFY_OTP, reqestMethod.POST, body);

        if (result.success && result.data) {
            // Store auth data in localStorage
            localStorage.setItem(localDb.AUTH, JSON.stringify(result.data));
            // Store selected role if exists
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((result.data as any).userType) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                localStorage.setItem('selectedRole', (result.data as any).userType);
            }
        }

        return result;
    } catch (error) {
        console.error('Verify OTP error:', error);
        throw error;
    }
};

/**
 * Select user role/type
 */
export const selectUserRole = async (userType: string): Promise<ApiResponse> => {
    try {
        const body: SelectRolePayload = {
            userType: userType,
        };

        const result = await serverCall(endPoints.SELECT_ROLE, reqestMethod.POST, body);

        if (result?.statusCode === 200 || result?.statusCode === 200) {
            localStorage.setItem('selectedRole', userType);
            // Update auth data if returned
            if (result.data) {
                const authData = localStorage.getItem(localDb.AUTH);
                if (authData) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const parsed: any = JSON.parse(authData);
                    parsed.userType = userType;
                    localStorage.setItem(localDb.AUTH, JSON.stringify(parsed));
                }
            }
        }

        return result;
    } catch (error) {
        console.error('Select role error:', error);
        throw error;
    }
};

/**
 * Logout user
 */
export const logout = async (): Promise<ApiResponse> => {
    try {
        const result = await serverCall(endPoints.LOGOUT, reqestMethod.POST, {});

        // Clear local storage
        localStorage.removeItem(localDb.AUTH);
        localStorage.removeItem('selectedRole');
        localStorage.removeItem('deviceId');

        return result;
    } catch (error) {
        console.error('Logout error:', error);
        // Clear local storage even if API call fails
        localStorage.removeItem(localDb.AUTH);
        localStorage.removeItem('selectedRole');
        localStorage.removeItem('deviceId');
        throw error;
    }
};

/**
 * Get current user data
 */
export const getCurrentUser = () => {
    try {
        const authData = localStorage.getItem(localDb.AUTH);
        if (authData) {
            return JSON.parse(authData);
        }
        return null;
    } catch (error) {
        console.error('Get current user error:', error);
        return null;
    }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
    const authData = getCurrentUser();
    return !!authData?.accessToken;
};

