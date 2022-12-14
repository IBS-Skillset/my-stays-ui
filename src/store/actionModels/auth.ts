export interface AuthAction {
  type: string
  payload: string
}

export interface UserAction {
  type: string
  payload: boolean
}

export interface ActionToken {
  type: string
  accessToken: string
  refreshToken: string
  expires: number
}
