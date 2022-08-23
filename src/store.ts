import { createStore } from 'redux'
import { allReducer } from './reducers/rootReducer'

//ToDo
// export const store = configureStore({
//  reducer: {allReducer}
// })

export const store = createStore(allReducer)
