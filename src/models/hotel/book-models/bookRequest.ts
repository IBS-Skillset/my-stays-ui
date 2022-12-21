export interface BookRequest {
  languageCode: string
  hotelCode: string
  countryCode: string
  ratePlanId: string
  numberOfRooms: number
  guestCount: number
  startDate: string
  endDate: string
  paymentInfo: PaymentInfo
  userInfo: UserInfo
  breakfastIncluded: boolean
  hotelPhone: string
  cancellationInfo: CancellationInfo
  nightlyPrice: number
}
export interface PaymentInfo {
  paymentType: string
  cardType: string
  cardNumber: string
  cvv: string
  expiryDate: string
  cardHolderName: string
}
interface UserInfo {
  prefix: string
  givenName: string
  surName: string
  phoneNumber: string
  email: string
  address: Address
}
interface Address {
  addressLine: string
  cityName: string
  postalCode: string
  countryCode: string
  countryName: string
}
interface CancellationInfo {
  cancellable: boolean
  cancellationDate: string
  cancellationPolicy: string
}
