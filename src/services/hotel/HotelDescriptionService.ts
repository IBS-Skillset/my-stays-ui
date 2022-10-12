import axios from 'axios'
import { format } from 'date-fns'
//import { HotelDescriptionRequest } from '../../models/hotel/description-models/hotelDescriptionRequest'
import { HotelAvailabilityRequest } from '../../models/hotel/search-models/hotelAvailabilityRequest'

const HOTEL_DESCRIPTION_URL = `http://${process.env.DOMAIN}:${process.env.HOTEL_SERVICE_PORT}/hotel-search-service/api/description`

class HotelDescriptionService {
  getHotelDescription(
    hotelCode: string,
    currencyCode: string,
    hotelAvailabilityRequest: HotelAvailabilityRequest,
  ) {
    return axios.post(
      HOTEL_DESCRIPTION_URL,
      JSON.stringify({
        languageCode: 'ENG',
        hotelCode: hotelCode,
        checkInDate: format(hotelAvailabilityRequest.checkInDate, 'yyyyMMdd'),
        checkOutDate: format(hotelAvailabilityRequest.checkOutDate, 'yyyyMMdd'),
        countryCode: 'IN',
        currencyCode: currencyCode,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}

export default new HotelDescriptionService()
