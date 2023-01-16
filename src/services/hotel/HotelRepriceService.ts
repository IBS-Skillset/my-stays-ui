import axios from 'axios'
import { format } from 'date-fns'
import { HotelAvailabilityRequest } from '../../models/hotel/search-models/hotelAvailabilityRequest'
import APIConstants from '../constants/APIConstants'

class HotelRepriceService {
  getHotelRepriceInfo(
    hotelCode: string,
    hotelAvailabilityRequest: HotelAvailabilityRequest,
    ratePlanId: string,
  ) {
    return axios.post(
      APIConstants.HOTEL_REPRICE_URL,
      JSON.stringify({
        languageCode: 'ENG',
        hotelCode: hotelCode,
        checkInDate: format(hotelAvailabilityRequest.checkInDate, 'yyyy-MM-dd'),
        checkOutDate: format(
          hotelAvailabilityRequest.checkOutDate,
          'yyyy-MM-dd',
        ),
        ratePlanId: ratePlanId,
        roomCount: 1,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}

export default new HotelRepriceService()
