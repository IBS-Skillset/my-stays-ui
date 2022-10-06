import { ActionSignIn } from '../models/actionModels/auth'

export function signInAction(signIn: boolean): ActionSignIn {
  return {
    type: 'SIGN_IN',
    payload: signIn,
  }
}
