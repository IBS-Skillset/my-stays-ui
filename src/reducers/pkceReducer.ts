import { AuthAction } from '../models/actionModels/auth'

const initialState = {
  codeVerifier: '',
  codeChallenge: '',
  authState: '',
}

export const pkceReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case 'AUTH_STATE':
      return { ...state, authState: action.payload }
    case 'CODE_VERIFIER':
      return { ...state, codeVerifier: action.payload }
    case 'CODE_CHALLENGE':
      return { ...state, codeChallenge: action.payload }
    default:
      return { ...state }
  }
}
