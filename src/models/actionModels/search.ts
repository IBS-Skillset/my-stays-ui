import { HotelAvailabilityResponse } from '../hotel/search-models/hotelAvailabilityResponse'
import { HotelAvailabilityRequest } from '../hotel/search-models/hotelAvailabilityRequest'
import { HotelDescriptionResponse } from '../hotel/description-models/hotelDescriptionResponse'

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
