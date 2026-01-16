import React, { useState, useEffect, ReactNode } from 'react';
import { Language, getDefaultLanguage, languageData } from '../utils/languageData';
import { getLanguageFromStorage, saveLanguageToStorage, updateUserLanguage } from '../services/languageService';
import { Translations, getTranslations } from '../utils/translations';
import { LanguageContext } from './LanguageContextDefinition';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState<Language>(getDefaultLanguage());
    const [isLoading, setIsLoading] = useState(false);
    const [translations, setTranslations] = useState<Translations>(getTranslations(getDefaultLanguage().langCode));

    useEffect(() => {
        // Load saved language preference on mount
        const savedLanguage = getLanguageFromStorage();
        if (savedLanguage) {
            // Find the language by langCode
            const foundLang = languageData.find(
                (l: Language) => l.langCode === savedLanguage.langCode
            );
            if (foundLang) {
                setCurrentLanguage(foundLang);
                setTranslations(getTranslations(foundLang.langCode));
            }
        }
    }, []);

    const changeLanguage = async (language: Language) => {
        setIsLoading(true);
        try {
            // Save to localStorage
            saveLanguageToStorage({
                name: language.name,
                langCode: language.langCode,
            });

            // Update via API if user is logged in
            const storedAuth = localStorage.getItem('Auth');
            if (storedAuth) {
                try {
                    const parsedAuth = JSON.parse(storedAuth);
                    const userId = parsedAuth?._id;
                    if (userId) {
                        await updateUserLanguage(userId, language.langCode);
                    }
                } catch (error) {
                    console.error('Error updating language via API:', error);
                    // Continue even if API call fails
                }
            }

            // Update current language and translations
            setCurrentLanguage(language);
            setTranslations(getTranslations(language.langCode));

            // Reload the page to apply language changes
            window.location.reload();
        } catch (error) {
            console.error('Error changing language:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <LanguageContext.Provider value={{ currentLanguage, changeLanguage, isLoading, t: translations }}>
            {children}
        </LanguageContext.Provider>
    );
};

