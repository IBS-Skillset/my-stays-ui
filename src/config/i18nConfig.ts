import _i18next, { use as i18nUse } from 'i18next'
import { initReactI18next } from 'react-i18next'
import Translate_EN_US from '../assets/i18n/en_us/LanguageTranslate.json'
import Translate_FR_FR from '../assets/i18n/fr_fr/LanguageTranslate.json'
import {
  getDefaultTranslatedLang,
  getTranslatedLang,
} from '../util/internationalization/internationalizationUtil'

// -----------------   Internationalisation ------------------

export const resources = {
  en_us: {
    LanguageTranslate: Translate_EN_US,
  },
  fr_fr: {
    LanguageTranslate: Translate_FR_FR,
  },
} as const

function configureI18next() {
  i18nUse(initReactI18next).init({
    lng: getTranslatedLang(),
    fallbackLng: getDefaultTranslatedLang(),
    ns: ['LanguageTranslate'],
    defaultNS: 'LanguageTranslate',
    fallbackNS: 'LanguageTranslate',
    interpolation: {
      escapeValue: false,
    },
    resources,
  })

  return _i18next
}

const i18nConf = {
  i18next: configureI18next(),
}

export default i18nConf
