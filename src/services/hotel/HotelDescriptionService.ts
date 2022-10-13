import axios from 'axios'

const HOTEL_DESCRIPTION_URL = `http://${process.env.DOMAIN}:${process.env.HOTEL_SERVICE_PORT}/hotel-search-service/api/description`

class HotelDescriptionService {
  getHotelDescription(hotelCode: string) {
    return axios.post(
      HOTEL_DESCRIPTION_URL,
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
