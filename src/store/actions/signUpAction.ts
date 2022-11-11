import { AnyAction } from 'redux'
import { ActionSignup } from '../actionModels/signup'

export function autoPopulateEmailAction(
  email: string,
): ActionSignup | AnyAction {
  return {
    type: 'ACTION_SIGNUP',
    payload: email,
  }
}
