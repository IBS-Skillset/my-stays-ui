import { UserAction } from '../models/actionModels/auth'

export function logOutAction() {
  return {
    type: 'USER_LOGOUT',
  }
}

export function userLogOutAction(isLoggedOut: boolean): UserAction {
  return {
    type: 'LOGOUT',
    payload: isLoggedOut,
  }
}
