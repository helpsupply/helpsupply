import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import englishLocale from './locales/en.json';
console.log(englishLocale);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: englishLocale,
    },
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
