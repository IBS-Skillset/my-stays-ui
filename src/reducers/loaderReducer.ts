import { AnyAction } from 'redux'
import { ActionLoader } from '../models/actionModels/loader'

const initialState = {
  showLoading: false,
}

export const loaderReducer = (
  state = initialState,
  action: ActionLoader | AnyAction,
) => {
  switch (action.type) {
    case 'ACTION_LOADING':
      return { ...state, showLoading: action.payload }
    default:
      return { ...state }
  }
}
