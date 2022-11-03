import { ActionNightCount } from '../../../models/actionModels/search'

const initialState = {
  days: 0,
}

export const nightCountReducer = (
  state = initialState,
  action: ActionNightCount,
) => {
  switch (action.type) {
    case 'DAYS':
      return { ...state, days: action.payload }
    default:
      return { ...state }
  }
}
