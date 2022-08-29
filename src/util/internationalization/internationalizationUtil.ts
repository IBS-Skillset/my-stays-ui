import { TRANSLATE_LANG } from '../../constants/appConstants'
import { getSelectedLang } from '../web/webStorageUtil'

export function getTranslatedLang(): string {
  return getSelectedLang()
}

export function getDefaultTranslatedLang(): string {
  return TRANSLATE_LANG.fr_fr
}
