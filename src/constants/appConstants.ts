export const LOCAL_STORAGE_KEYS: StorageKeys = {
  UserName: 'username',
  ClientIP: 'clientIP',
  CurrencySymbol: 'currencySymbol',
  SelectedLang: 'selectedLang',
}

interface StorageKeys {
  UserName: string
  ClientIP: string
  CurrencySymbol: string
  SelectedLang: string
}

export const TRANSLATE_LANG: TranslateKeys = {
  en_us: 'en_us',
  fr_fr: 'fr_fr',
}

interface TranslateKeys {
  en_us: string
  fr_fr: string
}
