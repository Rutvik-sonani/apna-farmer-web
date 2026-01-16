import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { languageData, Language } from '../../utils/languageData';
import { useLanguage } from '../../hooks/useLanguage';
import LoadingSpinner from '../../components/LoadingSpinner';
import './Language.css';

const LanguagePage = () => {
    const { currentLanguage, changeLanguage, isLoading } = useLanguage();
    const [selectedLanguage, setSelectedLanguage] = useState<Language>(currentLanguage);

    useEffect(() => {
        setSelectedLanguage(currentLanguage);
    }, [currentLanguage]);

    const handleLanguageSelect = async (language: Language) => {
        if (language.langCode !== selectedLanguage.langCode) {
            setSelectedLanguage(language);
            await changeLanguage(language);
        }
    };

    if (isLoading) {
        return <LoadingSpinner text="Changing language..." />;
    }

    return (
        <div className="language-page container" style={{ padding: '2rem' }}>
            <h2 style={{ color: 'var(--green)', marginBottom: '1.5rem', textAlign: 'center' }}>
                {currentLanguage.langCode === 'hi' ? 'अपनी भाषा चुनें' : currentLanguage.langCode === 'ma' ? 'तुमची भाषा निवडा' : currentLanguage.langCode === 'gu' ? 'તમારી ભાષા પસંદ કરો' : 'Choose Your Language'}
            </h2>
            <p style={{ textAlign: 'center', color: 'var(--subtitle)', marginBottom: '2rem' }}>
                {currentLanguage.langCode === 'hi' ? 'भाषा चुनें' : currentLanguage.langCode === 'ma' ? 'भाषा निवडा' : currentLanguage.langCode === 'gu' ? 'ભાષા પસંદ કરો' : 'Select Language'}
            </p>

            <div className="language-grid">
                {languageData.map((language) => (
                    <div
                        key={language.langCode}
                        className={`language-card ${selectedLanguage.langCode === language.langCode ? 'selected' : ''}`}
                        style={{
                            backgroundColor: language.color,
                            borderColor: selectedLanguage.langCode === language.langCode ? 'var(--green)' : 'transparent',
                        }}
                        onClick={() => handleLanguageSelect(language)}
                    >
                        {selectedLanguage.langCode === language.langCode && (
                            <div className="language-check">
                                <Check size={24} color="var(--green)" />
                            </div>
                        )}
                        <div className="language-icon" style={{ color: language.textColor }}>
                            {language.icon}
                        </div>
                        <div className="language-name" style={{ color: language.textColor }}>
                            {language.value}
                        </div>
                        <div className="language-name-en" style={{ color: language.textColor, opacity: 0.8 }}>
                            {language.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LanguagePage;

