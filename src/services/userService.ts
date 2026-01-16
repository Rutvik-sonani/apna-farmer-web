import { endPoints, reqestMethod } from './endpoints';
import { serverCall, ApiResponse } from './api';

/**
 * Fetch farmers list
 */
export const fetchFarmers = async (queryParams: string = ''): Promise<ApiResponse> => {
    try {
        const url = endPoints.FARMERS_GET + queryParams;
        const result = await serverCall(url, reqestMethod.GET);
        return result;
    } catch (error) {
        console.error('Fetch farmers error:', error);
        throw error;
    }
};

/**
 * Fetch buyers list
 */
export const fetchBuyers = async (queryParams: string = ''): Promise<ApiResponse> => {
    try {
        const url = endPoints.BUYERS_GET + queryParams;
        const result = await serverCall(url, reqestMethod.GET);
        return result;
    } catch (error) {
        console.error('Fetch buyers error:', error);
        throw error;
    }
};

/**
 * Fetch agro shops list
 */
export const fetchAgroShops = async (queryParams: string = ''): Promise<ApiResponse> => {
    try {
        const url = endPoints.AGRO_GET + queryParams;
        const result = await serverCall(url, reqestMethod.GET);
        return result;
    } catch (error) {
        console.error('Fetch agro shops error:', error);
        throw error;
    }
};

/**
 * Fetch FPO list
 */
export const fetchFPOs = async (queryParams: string = ''): Promise<ApiResponse> => {
    try {
        const url = endPoints.FPO_GET + queryParams;
        const result = await serverCall(url, reqestMethod.GET);
        return result;
    } catch (error) {
        console.error('Fetch FPOs error:', error);
        throw error;
    }
};

/**
 * Fetch user details by ID
 */
export const fetchUserDetails = async (userId: string): Promise<ApiResponse> => {
    try {
        const url = endPoints.USER_DATA + userId;
        const result = await serverCall(url, reqestMethod.GET);
        return result;
    } catch (error) {
        console.error('Fetch user details error:', error);
        throw error;
    }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (userId: string, data: unknown): Promise<ApiResponse> => {
    try {
        const url = endPoints.USER_DATA + userId;
        const result = await serverCall(url, reqestMethod.PUT, data);
        return result;
    } catch (error) {
        console.error('Update user profile error:', error);
        throw error;
    }
};

