import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

const getUserLanguage = (): string => {
  const savedUserData = localStorage.getItem("telegramUserData");
  if (savedUserData) {
    const userData = JSON.parse(savedUserData);
    const { languageCode } = userData;
    if (['ru', 'be', 'uk'].includes(languageCode)) {
      return languageCode;
    }
    return 'en';
  }
  return 'en';
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