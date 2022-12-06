export interface HotelRepriceResponse {
  responseStatus: ResponseStatus
  hotelCode: string
  ratePlanId: string
  currencyCode: string
  amount: number
  cancelPolicyDeadLine: string
  penaltyDescriptionText: string
}
interface ResponseStatus {
  status: number
}
