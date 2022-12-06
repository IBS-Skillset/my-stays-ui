export interface HotelRepriceResponse {
  responseStatus: ResponseStatus
  hotelCode: string
  ratePlanId: string
  currencyCode: string
  amount: number
  cancellationPolicyDeadline: string
  penaltyDescriptionText: string
}
interface ResponseStatus {
  status: number
}
