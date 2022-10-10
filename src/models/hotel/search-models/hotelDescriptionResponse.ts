export interface HotelDescriptionResponse {
  responseStatus: ResponseStatus
  descriptionItem: HotelDescription[]
}

interface ResponseStatus {
  status: number
}

interface HotelDescription {
  languageCode: string
  hotelCode: string //mandatory
  checkInDate: Date //same
  checkOutDate: Date //same
  countryCode: string
  currencyCode: string
}
