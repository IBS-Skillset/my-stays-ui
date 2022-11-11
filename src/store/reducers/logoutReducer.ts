import { UserAction } from '../actionModels/auth'

const initialState = {
  isLoggedOut: false,
}

export const logoutReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case 'LOGOUT':
      return { ...state, isLoggedOut: action.payload }
    default:
      return { ...state }
  }
}
