import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import WebApp from '@twa-dev/sdk';
import { MOCK_USER_DATA } from './utils/debug';

const getUserLanguage = (): string => {
  try {
    if (WebApp.initData) {
      // Get language from Telegram WebApp
      const user = WebApp.initDataUnsafe.user;
      if (user && user.language_code) {
        const { language_code } = user;
        if (['ru', 'be', 'uk'].includes(language_code)) {
          return language_code;
        }
      }
    } else if (process.env.NODE_ENV === 'development') {
      // Use mock data in development
      return MOCK_USER_DATA.languageCode || 'en';
    }
    return 'en';
  } catch (error) {
    console.warn('Error getting user language:', error);
    return 'en';
  }
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: getUserLanguage(),
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru', 'be', 'uk'],
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;