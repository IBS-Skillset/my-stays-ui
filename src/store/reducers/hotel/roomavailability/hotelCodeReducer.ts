import { ActionHotelCode } from '../../../actionModels/search'

const initialState = {
  hotelCode: '',
}

export const hotelCodeReducer = (
  state = initialState,
  action: ActionHotelCode,
) => {
  switch (action.type) {
    case 'HOTEL_CODE':
      return { ...state, hotelCode: action.payload }
    default:
      return { ...state }
  }
}
