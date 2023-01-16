import axios from 'axios'
import APIConstants from '../constants/APIConstants'

class HotelDescriptionService {
  getHotelDescription(hotelCode: string) {
    return axios.post(
      APIConstants.HOTEL_DESCRIPTION_URL,
      JSON.stringify({
        languageCode: 'ENG',
        hotelCode: hotelCode,
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
