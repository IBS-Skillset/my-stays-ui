import axios from 'axios'
import { PaymentInfo } from '../../models/hotel/book-models/bookRequest'
import { format } from 'date-fns'
import { HotelRepriceResponse } from '../../models/hotel/reprice-models/hotelRepriceResponse'
import { HotelAvailabilityRequest } from '../../models/hotel/search-models/hotelAvailabilityRequest'
import { UserDetails } from '../../models/user-model/userDetails'

const BOOK_BASE_URL = `http://${process.env.DOMAIN}:${process.env.HOTEL_SERVICE_PORT}/hotel-book/api/book`

class BookService {
  async getBookResponse(
    data: PaymentInfo,
    userDetails: UserDetails,
    repriceResponse: HotelRepriceResponse,
    hotelAvailabilityRequest: HotelAvailabilityRequest,
    hotelPhoneNumber: string,
    nightlyPrice: number,
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
          email: userDetails.email,
          givenName: userDetails.firstName,
          surName: userDetails.lastName,
          phoneNumber: userDetails.phone,
          address: {
            addressLine: userDetails.address.address,
            cityName: userDetails.address.city,
            postalCode: userDetails.address.zipcode,
            countryCode: 'FR',
            countryName: userDetails.address.country,
          },
        },
        breakfastIncluded: repriceResponse.isBreakfastIncluded,
        nightlyPrice: nightlyPrice,
        hotelPhone: hotelPhoneNumber,
        cancellationInfo: {
          cancellable: repriceResponse.isCancellable,
          cancellationDate: repriceResponse.cancelPolicyDeadLine,
          cancellationPolicy: repriceResponse.penaltyDescriptionText,
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
