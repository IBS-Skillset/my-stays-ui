import { loaderReducer } from './loaderReducer'
import { combineReducers } from 'redux'

export const allReducer = combineReducers({
  loader: loaderReducer,
})

export type IRootState = ReturnType<typeof allReducer>
