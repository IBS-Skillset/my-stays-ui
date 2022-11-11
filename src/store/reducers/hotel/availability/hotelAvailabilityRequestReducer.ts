import { HotelAvailabilityRequestAction } from '../../../actionModels/search'
const date = new Date()
const initialState = {
  hotelAvailabilityRequest: {
    latitude: '',
    longitude: '',
    checkInDate: { ...date },
    checkOutDate: { ...date },
  },
}
export const hotelAvailabilityRequestReducer = (
  state = initialState,
  action: HotelAvailabilityRequestAction,
) => {
  switch (action.type) {
    case 'HOTEL_AVAILABILITY_REQUEST':
      return {
        ...state,
        hotelAvailabilityRequest: action.payload,
      }
    default:
      return { ...state }
  }
}
