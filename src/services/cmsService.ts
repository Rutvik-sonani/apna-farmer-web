import { endPoints, reqestMethod } from './endpoints';
import { serverCall, ApiResponse } from './api';

/**
 * Fetch CMS content (About Us, Terms & Conditions, etc.)
 * @param type - 'about-us', 'terms-conditions', 'privacy-policy', etc.
 */
export const fetchCMS = async (type?: string): Promise<ApiResponse> => {
    try {
        let url = endPoints.ABOUT;
        if (type) {
            url += `?type=${type}`;
        }
        const result = await serverCall(url, reqestMethod.GET);
        return result;
    } catch (error) {
        console.error('Fetch CMS error:', error);
        throw error;
    }
};

/**
 * Fetch About Us content
 */
export const fetchAboutUs = async (): Promise<ApiResponse> => {
    return fetchCMS('about-us');
};

/**
 * Fetch Terms & Conditions
 */
export const fetchTermsConditions = async (): Promise<ApiResponse> => {
    return fetchCMS('terms-conditions');
};

/**
 * Fetch Privacy Policy
 */
export const fetchPrivacyPolicy = async (): Promise<ApiResponse> => {
    return fetchCMS('privacy-policy');
};

/**
 * Submit contact us form
 */
export const submitContactUs = async (data: {
    name: string;
    email: string;
    mobile: string;
    message: string;
    subject?: string;
}): Promise<ApiResponse> => {
    try {
        const result = await serverCall(endPoints.CONTACT, reqestMethod.POST, data);
        return result;
    } catch (error) {
        console.error('Submit contact us error:', error);
        throw error;
    }
};

