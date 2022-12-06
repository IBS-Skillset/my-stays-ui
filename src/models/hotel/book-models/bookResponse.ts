import {
  Address,
  ResponseStatus,
} from '../description-models/hotelDescriptionResponse'

export interface BookResponse {
  responseStatus: ResponseStatus
  startDate: string
  endDate: string
  hotelCode: string
  hotelName: string
  ratePlanId: string
  hotelAddress: Address
  roomRate: RoomRate
  pnrInfo: PnrInfo
}
interface RoomRate {
  totalAmount: number
  currencyCode: string
}
interface PnrInfo {
  bookingCode: string
  bookingDescription: string
  bookingState: string
  confirmationNumber: string
}
