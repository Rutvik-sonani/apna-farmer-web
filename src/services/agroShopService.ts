import { endPoints, reqestMethod } from './endpoints';
import { serverCall, ApiResponse } from './api';

/**
 * Fetch agro shop categories
 */
export const fetchAgroCategories = async (queryParams: string = ''): Promise<ApiResponse> => {
    try {
        const url = endPoints.AGRO_CATEGORY + queryParams;
        const result = await serverCall(url, reqestMethod.GET);
        return result;
    } catch (error) {
        console.error('Fetch agro categories error:', error);
        throw error;
    }
};

/**
 * Fetch agro shops list
 */
export const fetchAgroShops = async (queryParams: string = ''): Promise<ApiResponse> => {
    try {
        let url = endPoints.AGRO_GET;
        if (queryParams) {
            url += queryParams.startsWith('?') ? queryParams : `?${queryParams}`;
        }
        const result = await serverCall(url, reqestMethod.GET);
        return result;
    } catch (error) {
        console.error('Fetch agro shops error:', error);
        throw error;
    }
};

/**
 * Fetch agro shop by ID
 */
export const fetchAgroShopById = async (shopId: string): Promise<ApiResponse> => {
    try {
        const url = `${endPoints.AGRO_GET}/${shopId}`;
        const result = await serverCall(url, reqestMethod.GET);
        return result;
    } catch (error) {
        console.error('Fetch agro shop by ID error:', error);
        throw error;
    }
};

