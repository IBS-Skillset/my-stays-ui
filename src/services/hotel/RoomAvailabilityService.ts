import axios from 'axios'
import { format } from 'date-fns'
import { HotelAvailabilityRequest } from '../../models/hotel/search-models/hotelAvailabilityRequest'

const ROOM_SEARCH_BASE_URL = `http://${process.env.DOMAIN}:${process.env.HOTEL_SERVICE_PORT}/hotel-search-service/api/roomAvailability`

class RoomAvailabilityService {
  async getRoomAvailabilitySearch(
    code: string,
    hotelAvailabilityRequest: HotelAvailabilityRequest,
    days: number,
  ) {
    return await axios.post(
      ROOM_SEARCH_BASE_URL,
      JSON.stringify({
        hotelCode: code,
        checkInDate: format(hotelAvailabilityRequest.checkInDate, 'yyyy-MM-dd'),
        checkOutDate: format(
          hotelAvailabilityRequest.checkOutDate,
          'yyyy-MM-dd',
        ),
        languageCode: 'ENG',
        nightsNeeded: days,
        roomCount: 1,
        occupancy: 1,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}

export default new RoomAvailabilityService()
