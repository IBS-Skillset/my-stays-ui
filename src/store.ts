import { configureStore } from '@reduxjs/toolkit'
import { allReducer } from './reducers/rootReducer'

export const store = configureStore({
  reducer: allReducer,
})
