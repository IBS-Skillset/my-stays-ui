import { AnyAction } from 'redux'
import { ActionEmail } from '../actionModels/email'

const initialState = {
  email: '',
}

export const emailReducer = (
  state = initialState,
  action: ActionEmail | AnyAction,
) => {
  switch (action.type) {
    case 'ACTION_EMAIL':
      return { ...state, email: action.payload }
    default:
      return { ...state }
  }
}
