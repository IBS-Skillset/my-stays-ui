export interface RoomAvailabilityResponse {
  responseStatus: ResponseStatus
  hotelCode: string
  rateList: Rate[]
}

interface Rate {
  bookingCode: string
  available: string
  rateCategory: string
  amount: number
  totalAmount: number
  currency: string
  ratePlan: string
  rateType: string
  isCancellable: boolean
  isCVVRequired: boolean
  isBreakfastIncluded: boolean
  hotelCode: string
  roomDescriptionList: RoomDescription[]
  breakFastDetails: BreakFast[]
}

interface ResponseStatus {
  status: number
}

interface RoomDescription {
  description: string
}

interface BreakFast {
  breakfast: string
}
