import { ActionToken } from '../actionModels/auth'

export function tokenAction(
  accessToken: string,
  refreshToken: string,
  expires: number,
): ActionToken {
  return {
    type: 'TOKEN',
    accessToken: accessToken,
    refreshToken: refreshToken,
    expires: expires,
  }
}
