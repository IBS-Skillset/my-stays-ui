import { loaderReducer } from './loaderReducer'
import { combineReducers } from 'redux'
import { signupReducer } from './signupReducer'

export const allReducer = combineReducers({
  loader: loaderReducer,
  signup: signupReducer,
})

export type IRootState = ReturnType<typeof allReducer>
