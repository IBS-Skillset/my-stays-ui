export interface HotelDescriptionRequest {
  languageCode: string
  hotelCode: string //mandatory
  checkInDate: Date //same
  checkOutDate: Date //same
  countryCode: string
  currencyCode: string
}
