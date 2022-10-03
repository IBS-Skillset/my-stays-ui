import { AnyAction } from 'redux'
import { ActionSignup } from '../models/actionModels/signup'

export function autoPopulateEmailAction(
  email: string,
): ActionSignup | AnyAction {
  return {
    type: 'ACTION_SIGNUP',
    payload: email,
  }
}
