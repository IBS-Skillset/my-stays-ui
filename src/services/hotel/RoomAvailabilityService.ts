import axios from 'axios'
import { format } from 'date-fns'
import { HotelAvailabilityRequest } from '../../models/hotel/search-models/hotelAvailabilityRequest'
import APIConstants from '../constants/APIConstants'

class RoomAvailabilityService {
  async getRoomAvailabilitySearch(
    code: string,
    hotelAvailabilityRequest: HotelAvailabilityRequest,
    days: number,
  ) {
    return await axios.post(
      APIConstants.HOTEL_ROOM_AVAILABILITY_URL,
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
