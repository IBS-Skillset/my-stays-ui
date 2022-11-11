import { HotelDescriptionResponseAction } from '../../../actionModels/search'
import { HotelDescriptionResponse } from '../../../../models/hotel/description-models/hotelDescriptionResponse'

const initialState = {
  hotelDescriptionResponsesPerCode: {} as Record<
    string,
    HotelDescriptionResponse
  >,
}
export const hotelDescriptionResponseReducer = (
  state = initialState,
  action: HotelDescriptionResponseAction,
) => {
  switch (action.type) {
    case 'ADD_HOTEL_DESCRIPTION_RESPONSE':
      return Object.assign({}, state, {
        hotelDescriptionResponsesPerCode: {
          ...state.hotelDescriptionResponsesPerCode,
          [action.hotelCode]: action.payload,
        },
      })
    default:
      return { ...state }
  }
}
