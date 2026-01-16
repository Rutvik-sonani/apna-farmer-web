export interface Language {
    langCode: string;
    name: string;
    value: string;
    icon: string;
    color: string;
    textColor: string;
}

export const languageData: Language[] = [
    {
        langCode: 'hi',
        name: 'Hindi',
        value: 'हिंदी',
        icon: 'अ',
        color: '#E8F5E9',
        textColor: '#2E7D32',
    },
    {
        langCode: 'en',
        name: 'English',
        value: 'English',
        icon: 'A',
        color: '#E3F2FD',
        textColor: '#1565C0',
    },
    {
        langCode: 'ma',
        name: 'Marathi',
        value: 'मराठी',
        icon: 'आ',
        color: '#FFF9C4',
        textColor: '#F57F17',
    },
    {
        langCode: 'gu',
        name: 'Gujarati',
        value: 'ગુજરાતી',
        icon: 'એ',
        color: '#FFEBEE',
        textColor: '#C62828',
    },
];

export const LANGUAGE_KEY = 'LANGUAGE_KEY';

export const getDefaultLanguage = (): Language => {
    return languageData.find(lang => lang.langCode === 'hi') || languageData[0];
};

