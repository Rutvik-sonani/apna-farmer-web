import api from './api';
import { endPoints } from './endpoints';

export interface LanguagePreference {
    name: string;
    langCode: string;
}

export const updateUserLanguage = async (userId: string, languageCode: string): Promise<unknown> => {
    try {
        // Update language preference via user profile update
        const body = {
            language: languageCode,
        };
        const result = await api.put(`${endPoints.USER_DATA}${userId}`, body);
        return result;
    } catch (error) {
        console.error('Error updating user language:', error);
        throw error;
    }
};

export const getLanguageFromStorage = (): LanguagePreference | null => {
    try {
        const stored = localStorage.getItem('LANGUAGE_KEY');
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Error reading language from storage:', error);
    }
    return null;
};

export const saveLanguageToStorage = (language: LanguagePreference): void => {
    try {
        localStorage.setItem('LANGUAGE_KEY', JSON.stringify(language));
    } catch (error) {
        console.error('Error saving language to storage:', error);
    }
};

