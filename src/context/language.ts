import { createContext, useContext } from 'react';

export type Language = 'en' | 'my';

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);

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
