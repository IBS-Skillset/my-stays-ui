import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './reducers/rootReducer'
import { loadState, saveState } from './stateStorage'
import {
  createStateSyncMiddleware,
  initMessageListener,
} from 'redux-state-sync'

const preloadedState = loadState()
const middlewares = [createStateSyncMiddleware()]

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
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

initMessageListener(store)
