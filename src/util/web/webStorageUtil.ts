import {
  LOCAL_STORAGE_KEYS,
  TRANSLATE_LANG,
} from '../../constants/appConstants'
import { getDefaultTranslatedLang } from '../internationalization/internationalizationUtil'

export function getSelectedLang(): string {
  const selected = sessionStorage.getItem(LOCAL_STORAGE_KEYS.SelectedLang)
  if (selected && selected in TRANSLATE_LANG) {
    return selected
  }
  return getDefaultTranslatedLang()
}
