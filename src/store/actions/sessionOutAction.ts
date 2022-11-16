import { UserAction } from '../actionModels/auth'

export function userSessionOutAction(isSessionOut: boolean): UserAction {
  return {
    type: 'SESSION_OUT',
    payload: isSessionOut,
  }
}
