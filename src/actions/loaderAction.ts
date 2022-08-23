import { AnyAction } from 'redux'
import { ActionLoader } from '../models/actionModels/loader'

export function loadingToggleAction(status: boolean): ActionLoader | AnyAction {
  return {
    type: 'ACTION_LOADING',
    payload: status,
  }
}
