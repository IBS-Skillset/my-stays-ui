import { AnyAction } from 'redux'
import { ActionSignup } from '../models/actionModels/signup'

const initialState = {
  autoFillEmail: '',
}

export const signupReducer = (
  state = initialState,
  action: ActionSignup | AnyAction,
) => {
  switch (action.type) {
    case 'ACTION_SIGNUP':
      return { ...state, autoFillEmail: action.payload }
    default:
      return { ...state }
  }
}
