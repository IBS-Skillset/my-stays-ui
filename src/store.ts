import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './reducers/rootReducer'
import { loadState, saveState } from './stateStorage'

const preloadedState = loadState()
export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
})

store.subscribe(() => {
  saveState({
    pkce: store.getState().pkce,
    token: store.getState().token,
    authorize: store.getState().authorize,
    logout: store.getState().logout,
  })
})
