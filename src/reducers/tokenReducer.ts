import { AuthAction } from '../models/actionModels/auth'

const initialState = {
  accessToken: '',
  refreshToken: '',
}

export const tokenReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case 'ACCESS_TOKEN':
      return { ...state, accessToken: action.payload }
    case 'REFRESH_TOKEN':
      return { ...state, refreshToken: action.payload }
    default:
      return { ...state }
  }
}
