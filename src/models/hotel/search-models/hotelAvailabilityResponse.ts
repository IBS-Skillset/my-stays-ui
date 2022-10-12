export interface HotelAvailabilityResponse {
  responseStatus: ResponseStatus
  hotelItem: Hotel[]
}

interface ResponseStatus {
  status: number
}

interface Address {
  streetAddress: string
  cityName: string
  zipCode: string
  countryName: string
}
interface Hotel {
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
