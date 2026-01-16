import { createContext } from 'react';
import { Language } from '../utils/languageData';
import { Translations } from '../utils/translations';

export interface LanguageContextType {
    currentLanguage: Language;
    changeLanguage: (language: Language) => Promise<void>;
    isLoading: boolean;
    t: Translations;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
