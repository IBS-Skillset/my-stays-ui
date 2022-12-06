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
export interface Address {
  addressLine: string
  cityName: string
  postalCode: string
  countryCode: string
  countryName: string
}
