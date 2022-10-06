import { ActionSignIn } from '../models/actionModels/auth'

const initialState = {
  signIn: false,
}

export const signInReducer = (state = initialState, action: ActionSignIn) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, signIn: action.payload }
    default:
      return { ...state }
  }
}
