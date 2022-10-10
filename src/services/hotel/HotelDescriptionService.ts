import axios from 'axios'
import { format } from 'date-fns'
import { HotelDescriptionRequest } from '../../models/hotel/search-models/hotelDescriptionRequest'

const HOTEL_DESCRIPTION_URL =
  'http://${process.env.DOMAIN}:${process.env.HOTEL_SERVICE_PORT}/hotel-search-service/api/description'

class HotelDescriptionService {
  getHotelDescription(hotelDescriptionRequest: HotelDescriptionRequest) {
    return axios.post(
      HOTEL_DESCRIPTION_URL,
      JSON.stringify({
        languageCode: hotelDescriptionRequest.languageCode,
        hotelCode: hotelDescriptionRequest.hotelCode,
        checkInDate: format(hotelDescriptionRequest.checkInDate, 'yyyyMMdd'),
        checkOutDate: format(hotelDescriptionRequest.checkOutDate, 'yyyyMMdd'),
        countryCode: hotelDescriptionRequest.countryCode,
        currencyCode: hotelDescriptionRequest.currencyCode,
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
