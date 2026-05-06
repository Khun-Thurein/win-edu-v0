import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Language = 'en' | 'my';

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
};

const STORAGE_KEY = 'win-language';

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === 'my' ? 'my' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((prev) => (prev === 'en' ? 'my' : 'en')),
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

export function pickByLanguage(language: Language, english: string, myanmar?: string) {
  if (language === 'my' && myanmar?.trim()) return myanmar;
  return english;
}
