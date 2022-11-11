import { HotelAvailabilityResponseAction } from '../../../actionModels/search'
import { HotelAvailabilityResponse } from '../../../../models/hotel/search-models/hotelAvailabilityResponse'

const hotelAvailability: HotelAvailabilityResponse = {
  responseStatus: { status: 0 },
  hotelItem: [
    {
      hotelCode: '',
      hotelName: '',
      hotelCategory: 0,
      address: {
        streetAddress: '',
        cityName: '',
        zipCode: '',
        countryName: '',
      },
      cityCode: '',
      latitude: 0,
      longitude: 0,
      minPrice: 0,
      currencyCode: '',
      breakfast: false,
    },
  ],
}
const initialState = {
  hotelAvailabilityResponse: hotelAvailability,
}
export const hotelAvailabilityResponseReducer = (
  state = initialState,
  action: HotelAvailabilityResponseAction,
) => {
  switch (action.type) {
    case 'HOTEL_AVAILABILITY_RESPONSE':
      return {
        ...state,
        hotelAvailabilityResponse: action.payload,
      }
    default:
      return { ...state }
  }
}
