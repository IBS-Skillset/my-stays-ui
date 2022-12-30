import { BookResponse } from '../../../../models/hotel/book-models/bookResponse'
import { BookResponseAction } from '../../../actionModels/book'

const book: BookResponse = {
  responseStatus: { status: -1, errorMessage: '', errorCode: '' },
  startDate: '',
  endDate: '',
  hotelCode: '',
  hotelName: '',
  ratePlanId: '',
  hotelAddress: {
    streetAddress: '',
    zipCode: '',
    cityName: '',
    countryName: '',
  },
  roomRate: { totalAmount: 0, currencyCode: '', rateDescription: '' },
  pnrInfo: {
    bookingCode: '',
    bookingDescription: '',
    bookingState: '',
    confirmationNumber: '',
  },
}
const initialState = {
  bookResponse: book,
}
export const bookResponseReducer = (
  state = initialState,
  action: BookResponseAction,
) => {
  switch (action.type) {
    case 'BOOK_RESPONSE':
      return {
        ...state,
        bookResponse: action.payload,
      }
    default:
      return { ...state }
  }
}
