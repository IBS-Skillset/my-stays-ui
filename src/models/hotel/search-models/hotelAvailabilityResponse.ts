export interface HotelAvailabilityResponse {
  responseStatus: ResponseStatus
  hotelItem: Hotel[]
}

export interface ResponseStatus {
  status: number
  errorMessage: string
  errorCode: string
}

interface Address {
  streetAddress: string
  cityName: string
  zipCode: string
  countryName: string
}
export interface Hotel {
  hotelCode: string
  hotelName: string
  hotelCategory: number
  address: Address
  cityCode: string
  latitude: number
  longitude: number
  minPrice: number
  currencyCode: string
  breakfast?: boolean
}
