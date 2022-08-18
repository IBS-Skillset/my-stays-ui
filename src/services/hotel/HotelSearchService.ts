import axios from 'axios'
import { HotelAvailabilityRequest } from '../../models/hotel/search-models/hotelAvailabilityRequest'

const HOTEL_SEARCH_BASE_URL =
  'http://localhost:9902/hotel-search-service/api/availability'

class HotelSearchService {
  getHotelAvailabilitySearch(e: HotelAvailabilityRequest) {
    return axios.post(HOTEL_SEARCH_BASE_URL, JSON.stringify(e), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export default new HotelSearchService()
