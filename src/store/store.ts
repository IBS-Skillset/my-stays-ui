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
    email: store.getState().email,
  })
})

initMessageListener(store)

/***
 * Attaching the store to Cypress window.
 * This is to access the store in automation test cases using Cypress.
 * (Added ts-ignore comments also to make the TS types check pass for this)
 */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
if (window.Cypress) {
  // @ts-ignore
  window.store = store
}
/* eslint-enable @typescript-eslint/ban-ts-comment */
