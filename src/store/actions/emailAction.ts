import { AnyAction } from 'redux'
import { ActionEmail } from '../actionModels/email'

export function emailAction(email: string): ActionEmail | AnyAction {
  return {
    type: 'ACTION_EMAIL',
    payload: email,
  }
}
