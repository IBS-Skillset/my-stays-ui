import { configureStore } from '@reduxjs/toolkit'
import { allReducer } from './reducers/rootReducer'
import { loadState, saveState } from './localStorage'

const preloadedState = loadState()
export const store = configureStore({
  reducer: allReducer,
  preloadedState,
})

store.subscribe(() => {
  saveState({
    pkce: store.getState().pkce,
    token: store.getState().token,
  })
})
