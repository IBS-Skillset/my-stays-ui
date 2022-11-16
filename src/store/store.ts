import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers/rootReducer'
import { loadState, saveState } from './stateStorage'
import {
  createStateSyncMiddleware,
  initMessageListener,
  initStateWithPrevTab,
} from 'redux-state-sync'

const preloadedState = loadState()
const middlewares = [createStateSyncMiddleware()]

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
  preloadedState,
})

initStateWithPrevTab(store)

store.subscribe(() => {
  saveState({
    pkce: store.getState().pkce,
    token: store.getState().token,
    authorize: store.getState().authorize,
    logout: store.getState().logout,
    sessionOut: store.getState().sessionOut,
  })
})

initMessageListener(store)
