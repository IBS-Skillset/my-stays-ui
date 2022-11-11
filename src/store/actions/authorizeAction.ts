import { UserAction } from '../actionModels/auth'

export function authorizeAction(isAuthorized: boolean): UserAction {
  return {
    type: 'AUTHORIZE',
    payload: isAuthorized,
  }
}
