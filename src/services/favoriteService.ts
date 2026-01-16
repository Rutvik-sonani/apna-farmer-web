import { endPoints, reqestMethod } from './endpoints';
import { serverCall, ApiResponse } from './api';

/**
 * Fetch favorites by type
 * @param type - FARMER, BUYER, AGROSHOP, FPO, CROP
 */
export const fetchFavorites = async (type: string): Promise<ApiResponse> => {
    try {
        const url = `${endPoints.FAVOURITE}?type=${type}`;
        const result = await serverCall(url, reqestMethod.GET);
        return result;
    } catch (error) {
        console.error('Fetch favorites error:', error);
        throw error;
    }
};

/**
 * Add/Remove favorite
 * @param id - Item ID to favorite/unfavorite
 * @param type - FARMER, BUYER, AGROSHOP, FPO, CROP
 * @param isFavorite - true to favorite, false to unfavorite
 */
export const toggleFavorite = async (
    id: string,
    type: string,
    isFavorite: boolean
): Promise<ApiResponse> => {
    try {
        const url = `${endPoints.FAVOURITE}/${id}`;
        const body = {
            type: type,
            favoriteId: isFavorite,
        };
        const result = await serverCall(url, reqestMethod.PUT, body);
        return result;
    } catch (error) {
        console.error('Toggle favorite error:', error);
        throw error;
    }
};

