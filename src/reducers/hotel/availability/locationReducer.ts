import { ActionLocation } from '../../../models/actionModels/search'

const initialState = {
  location: '',
}

export const locationReducer = (
  state = initialState,
  action: ActionLocation,
) => {
  switch (action.type) {
    case 'LOCATION':
      return { ...state, location: action.payload }
    default:
      return { ...state }
  }
}
