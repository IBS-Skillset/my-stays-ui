import { HotelAvailabilityResponse } from '../../models/hotel/search-models/hotelAvailabilityResponse'
import { HotelAvailabilityRequest } from '../../models/hotel/search-models/hotelAvailabilityRequest'
import { HotelDescriptionResponse } from '../../models/hotel/description-models/hotelDescriptionResponse'
import { HotelRepriceResponse } from '../../models/hotel/reprice-models/hotelRepriceResponse'

export interface HotelAvailabilityRequestAction {
  type: string
  payload: HotelAvailabilityRequest
}
export interface HotelAvailabilityResponseAction {
  type: string
  payload: HotelAvailabilityResponse
}

export interface ActionNightCount {
  type: string
  payload: number
}

export interface ActionLocation {
  type: string
  payload: string
}

export interface HotelDescriptionResponseAction {
  type: string
  hotelCode: string
  payload: HotelDescriptionResponse
}

export interface ActionRate {
  type: string
  payload: HotelRepriceResponse
  initialRate: number
  nightlyPrice: number
}
