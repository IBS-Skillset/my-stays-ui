export interface HotelDescriptionResponse {
  responseStatus: ResponseStatus
  media: Media
  hotelItem: AvailableHotelItem
  descriptions: Descriptions
  services: Services
  safetyInfo: SafetyInfo
}
export interface ResponseStatus {
  status: number
  errorMessage: string
  errorCode: string
}

interface Media {
  mediaUrl: string[]
}
interface Address {
  streetAddress: string
  cityName: string
  zipCode: string
  countryName: string
  phoneNumber: string
}

interface AvailableHotelItem {
  address: Address
  latitude: number
  longitude: number
  hotelName: string
}
interface Descriptions {
  decription: string[]
}

interface Services {
  service: string[]
}

interface SafetyInfo {
  safetyInfo: string[]
}
