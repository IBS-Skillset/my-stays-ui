import { AnyAction } from 'redux'
import { ActionLoader } from '../models/actionModels/loader'

export function loadingToggleAction(
  status: boolean,
  showLoading: boolean,
): ActionLoader | AnyAction {
  return {
    type: 'ACTION_LOADING',
    payload: { status: status, showLoading: showLoading },
  }
}
