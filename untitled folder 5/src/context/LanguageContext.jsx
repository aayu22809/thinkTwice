import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../locales/translations';
import { getScenarios } from '../data';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    // Get stored language or default to 'en'
    const storedLang = localStorage.getItem('appLanguage');
    const [language, setLanguage] = useState(storedLang || 'en');

    useEffect(() => {
        localStorage.setItem('appLanguage', language);
        // Optionally set document lang attribute
        document.documentElement.lang = language;
    }, [language]);

    // Helper to get translated string
    const t = (key) => {
        return translations[language][key] || key;
    };

    // Helper to get scenarios for current language
    const currentScenarios = getScenarios(language);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, scenarios: currentScenarios }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
