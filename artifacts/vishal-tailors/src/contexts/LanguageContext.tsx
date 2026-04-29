import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ne');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('vishal-lang') as Language;
    if (saved && (saved === 'ne' || saved === 'hi' || saved === 'en')) {
      setLanguageState(saved);
    }
    setIsMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('vishal-lang', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  if (!isMounted) return null;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={`font-${language} transition-opacity duration-300`}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
