import { AuthAction } from '../models/actionModels/auth'

export function accessTokenAction(accessToken: string): AuthAction {
  return {
    type: 'ACCESS_TOKEN',
    payload: accessToken,
  }
}

export function refreshTokenAction(refreshToken: string): AuthAction {
  return {
    type: 'REFRESH_TOKEN',
    payload: refreshToken,
  }
}
