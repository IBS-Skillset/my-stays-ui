import { Address } from './hotelDescriptionResponse'

export interface HotelDetails {
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
  mediaUrl: string[]
  descriptions: string[]
  services: string[]
  safetyInfo: string[]
}
