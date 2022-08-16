import axios from 'axios'

const HOTEL_SEARCH_BASE_URL =
  'http://localhost:9902/hotel-search-service/api/availability'

class HotelSearchService {
  getHotelAvailabilitySearch(e: any) {
    return axios.post(HOTEL_SEARCH_BASE_URL, JSON.stringify(e), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export default new HotelSearchService()
