import { endPoints, reqestMethod } from './endpoints';
import { serverCall, ApiResponse } from './api';

/**
 * Fetch crop categories for home screen
 */
export const fetchCropCategories = async (): Promise<ApiResponse> => {
    try {
        const result = await serverCall(endPoints.CROP_CATEGORY, reqestMethod.GET);
        return result;
    } catch (error) {
        console.error('Fetch crop categories error:', error);
        throw error;
    }
};

/**
 * Fetch crop category with query params
 */
export const fetchCropCategory = async (queryString: string = ''): Promise<ApiResponse> => {
    try {
        const url = endPoints.CROP_CATEGORY + queryString;
        const result = await serverCall(url, reqestMethod.GET);
        return result;
    } catch (error) {
        console.error('Fetch crop category error:', error);
        throw error;
    }
};

/**
 * Fetch crop types
 */
export const fetchCropTypes = async (): Promise<ApiResponse> => {
    try {
        const result = await serverCall(endPoints.CROP_TYPE, reqestMethod.GET);
        return result;
    } catch (error) {
        console.error('Fetch crop types error:', error);
        throw error;
    }
};

/**
 * Fetch crop names
 */
export const fetchCropNames = async (category?: string): Promise<ApiResponse> => {
    try {
        let url = endPoints.CROP_NAME;
        if (category) {
            url += `?cropCategory=${encodeURIComponent(category)}`;
        }
        const result = await serverCall(url, reqestMethod.GET);
        return result;
    } catch (error) {
        console.error('Fetch crop names error:', error);
        throw error;
    }
};

/**
 * Fetch requirements/buyers requirements
 */
export const fetchRequirements = async (
    isView: boolean = false,
    userId?: string,
    latitude?: number,
    longitude?: number
): Promise<ApiResponse> => {
    try {
        const lat = latitude || 12.71154; // Default latitude
        const lon = longitude || 75.87947; // Default longitude

        let url = `${endPoints.REQUIREMENTS}?latitude=${lat}&longitude=${lon}&limit=10&cropCategoryIds=&cropNameIds=`;

        if (isView && userId) {
            url += `&userId=${userId}`;
        }

        const result = await serverCall(url, reqestMethod.GET);
        return result;
    } catch (error) {
        console.error('Fetch requirements error:', error);
        throw error;
    }
};

/**
 * Like/Dislike requirement
 */
export const likeDislikeRequirement = async (
    requirementId: string,
    isLiked: boolean
): Promise<ApiResponse> => {
    try {
        const body = {
            requirementId: requirementId,
            isLiked: isLiked,
        };
        const result = await serverCall(endPoints.REQUIREMENTS_LIKE_DISLIKED, reqestMethod.POST, body);
        return result;
    } catch (error) {
        console.error('Like/Dislike requirement error:', error);
        throw error;
    }
};

/**
 * Fetch buyer categories
 */
export const fetchBuyerCategories = async (): Promise<ApiResponse> => {
    try {
        const result = await serverCall(endPoints.BUYER_CATEGORY, reqestMethod.GET);
        return result;
    } catch (error) {
        console.error('Fetch buyer categories error:', error);
        throw error;
    }
};

/**
 * Fetch agro shop categories
 */
export const fetchAgroCategories = async (): Promise<ApiResponse> => {
    try {
        const result = await serverCall(endPoints.AGRO_CATEGORY, reqestMethod.GET);
        return result;
    } catch (error) {
        console.error('Fetch agro categories error:', error);
        throw error;
    }
};

