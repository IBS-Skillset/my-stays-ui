import { UserAction } from '../actionModels/auth'

const initialState = {
  isSessionOut: false,
}

export const sessionOutReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case 'SESSION_OUT':
      return { ...state, isSessionOut: action.payload }
    default:
      return { ...state }
  }
}
