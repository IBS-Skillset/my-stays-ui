export interface HotelRepriceResponse {
  responseStatus: ResponseStatus
  hotelCode: string
  ratePlanId: string
  currencyCode: string
  amount: number
  cancelPolicyDeadLine: string
  penaltyDescriptionText: string
  isCancellable: boolean
  isBreakfastIncluded: boolean
}
interface ResponseStatus {
  status: number
}
