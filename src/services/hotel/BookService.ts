import axios from 'axios'
import { PaymentInfo } from '../../models/hotel/book-models/bookRequest'
import { format } from 'date-fns'
import { HotelRepriceResponse } from '../../models/hotel/reprice-models/hotelRepriceResponse'
import { HotelAvailabilityRequest } from '../../models/hotel/search-models/hotelAvailabilityRequest'

const BOOK_BASE_URL = `http://${process.env.DOMAIN}:${process.env.HOTEL_SERVICE_PORT}/hotel-book-service/api/book`

class BookService {
  async getBookResponse(
    data: PaymentInfo,
    repriceResponse: HotelRepriceResponse,
    hotelAvailabilityRequest: HotelAvailabilityRequest,
  ) {
    return await axios.post(
      BOOK_BASE_URL,
      JSON.stringify({
        languageCode: 'ENG',
        hotelCode: repriceResponse.hotelCode,
        ratePlanId: repriceResponse.ratePlanId,
        countryCode: 'IND',
        numberOfRooms: 1,
        guestCount: 1,
        startDate: format(hotelAvailabilityRequest.checkInDate, 'yyyy-MM-dd'),
        endDate: format(hotelAvailabilityRequest.checkOutDate, 'yyyy-MM-dd'),
        paymentInfo: {
          paymentType: 'CC',
          cardType: 'VI',
          cardNumber: data.cardNumber,
          cvv: data.cvv,
          expiryDate: data.expiryDate.replace('/', ''),
          cardHolderName: data.cardHolderName,
        },
        userInfo: {
          prefix: 'Mr',
          email: 'test@gmail.com',
          givenName: 'test',
          surName: 'user',
          phoneNumber: '0033123456789',
          address: {
            addressLine: 'LEVALLOIS',
            cityName: 'LEVALLOIS PERRET',
            postalCode: '92300',
            countryCode: 'FR',
            countryName: 'FRANCE',
          },
        },
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}

export default new BookService()
