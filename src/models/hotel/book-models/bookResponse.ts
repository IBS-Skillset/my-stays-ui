import { ResponseStatus } from '../description-models/hotelDescriptionResponse'

export interface BookResponse {
  responseStatus: ResponseStatus
  startDate: string
  endDate: string
  hotelCode: string
  hotelName: string
  ratePlanId: string
  hotelAddress: HotelAddress
  roomRate: RoomRate
  pnrInfo: PnrInfo
}
interface RoomRate {
  totalAmount: number
  currencyCode: string
  rateDescription: string
}
interface PnrInfo {
  bookingCode: string
  bookingDescription: string
  bookingState: string
  confirmationNumber: string
}
interface HotelAddress {
  streetAddress: string
  cityName: string
  zipCode: string
  countryName: string
}
