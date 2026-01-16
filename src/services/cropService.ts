import { endPoints, reqestMethod } from './endpoints';
import { serverCall, ApiResponse } from './api';

/**
 * Fetch crops being sold (for marketplace/farmers page)
 */
export const fetchCropsForSale = async (queryParams: string = ''): Promise<ApiResponse> => {
    try {
        let url = endPoints.SELL_CROP;
        if (queryParams) {
            url += queryParams.startsWith('?') ? queryParams : `?${queryParams}`;
        }
        const result = await serverCall(url, reqestMethod.GET);
        return result;
    } catch (error) {
        console.error('Fetch crops for sale error:', error);
        throw error;
    }
};

/**
 * Fetch crop by ID
 */
export const fetchCropById = async (cropId: string): Promise<ApiResponse> => {
    try {
        const url = `${endPoints.SELL_CROP}/${cropId}`;
        const result = await serverCall(url, reqestMethod.GET);
        return result;
    } catch (error) {
        console.error('Fetch crop by ID error:', error);
        throw error;
    }
};

/**
 * Fetch user's crops (my crops)
 */
export const fetchMyCrops = async (userId: string): Promise<ApiResponse> => {
    try {
        const url = `${endPoints.SELL_CROP}?userId=${userId}`;
        const result = await serverCall(url, reqestMethod.GET);
        return result;
    } catch (error) {
        console.error('Fetch my crops error:', error);
        throw error;
    }
};

