import { ActionToken } from '../models/actionModels/auth'

const initialState = {
  accessToken: '',
  refreshToken: '',
  expires: 0,
}

export const tokenReducer = (state = initialState, action: ActionToken) => {
  switch (action.type) {
    case 'TOKEN':
      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        expires: action.expires,
      }
    default:
      return { ...state }
  }
}
