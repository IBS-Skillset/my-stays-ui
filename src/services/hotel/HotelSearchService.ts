import axios from 'axios'
import { format } from 'date-fns'
import { HotelAvailabilityRequest } from '../../models/hotel/search-models/hotelAvailabilityRequest'

const HOTEL_SEARCH_BASE_URL =
  'http://localhost:8085/hotel-search-service/api/availability'

class HotelSearchService {
  getHotelAvailabilitySearch(
    hotelAvailabilityRequest: HotelAvailabilityRequest,
  ) {
    return axios.post(
      HOTEL_SEARCH_BASE_URL,
      JSON.stringify({
        latitude: hotelAvailabilityRequest.latitude,
        longitude: hotelAvailabilityRequest.longitude,
        checkInDate: format(hotelAvailabilityRequest.checkInDate, 'yyyyMMdd'),
        checkOutDate: format(hotelAvailabilityRequest.checkOutDate, 'yyyyMMdd'),
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}

export default new HotelSearchService()
