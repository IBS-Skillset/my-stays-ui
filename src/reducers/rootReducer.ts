import { loaderReducer } from './loaderReducer'
import { AnyAction, combineReducers } from 'redux'
import { signupReducer } from './signupReducer'
import { pkceReducer } from './pkceReducer'
import { tokenReducer } from './tokenReducer'
import { authorizeReducer } from './authorizeReducer'
import { logoutReducer } from './logoutReducer'

const allReducer = combineReducers({
  loader: loaderReducer,
  signup: signupReducer,
  pkce: pkceReducer,
  token: tokenReducer,
  authorize: authorizeReducer,
  logout: logoutReducer,
})

export const rootReducer = (
  state: IRootState | undefined,
  action: AnyAction,
) => {
  if (action.type === 'USER_LOGOUT') {
    return allReducer(undefined, action)
  }
  return allReducer(state, action)
}

export type IRootState = ReturnType<typeof allReducer>
