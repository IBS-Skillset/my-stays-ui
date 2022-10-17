import { UserAction } from '../models/actionModels/auth'

export function authorizeAction(isAuthorized: boolean): UserAction {
  return {
    type: 'AUTHORIZE',
    payload: isAuthorized,
  }
}
