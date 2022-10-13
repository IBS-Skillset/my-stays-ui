export interface HotelDescriptionResponse {
  responseStatus: ResponseStatus
  media: Media
  hotelItem: AvailableHotelItem
  descriptions: Descriptions
  services: Services
  safetyInfo: SafetyInfo
}
interface ResponseStatus {
  status: number
}

interface Media {
  mediaUrl: string[]
}
export interface Address {
  streetAddress: string
  cityName: string
  zipCode: string
  countryName: string
}

interface AvailableHotelItem {
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
interface Descriptions {
  description: string[]
}

interface Services {
  services: string[]
}

interface SafetyInfo {
  safetyInfo: string[]
}
