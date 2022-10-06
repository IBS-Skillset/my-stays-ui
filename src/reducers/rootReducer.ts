import { loaderReducer } from './loaderReducer'
import { combineReducers } from 'redux'
import { signupReducer } from './signupReducer'
import { pkceReducer } from './pkceReducer'
import { tokenReducer } from './tokenReducer'
import { signInReducer } from './signInReducer'

export const allReducer = combineReducers({
  loader: loaderReducer,
  signup: signupReducer,
  pkce: pkceReducer,
  token: tokenReducer,
  signIn: signInReducer,
})

export type IRootState = ReturnType<typeof allReducer>
