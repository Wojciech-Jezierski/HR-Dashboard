import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationPolish from '../Translation/Polish/translation.json';
import translationEnglish from '../Translation/English/translationSecond.json';

const resources = {
  en: {
    translation: translationEnglish,
  },
  pl: {
    translation: translationPolish,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: 'en',
});

export { i18next };
