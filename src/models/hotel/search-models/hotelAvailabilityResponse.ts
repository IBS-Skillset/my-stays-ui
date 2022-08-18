export interface HotelAvailabilityResponse {
  response_status: ResponseStatus
  hotel_item: Hotel[]
}

interface ResponseStatus {
  status: number
}

interface Address {
  street_address: string
  city_name: string
  zip_code: string
  country_name: string
}

interface Hotel {
  hotel_code: string
  hotel_name: string
  hotel_category: number
  address: Address
  city_code: string
  latitude: number
  longitude: number
  min_price: number
  currency_code: string
  breakfast?: boolean
}
