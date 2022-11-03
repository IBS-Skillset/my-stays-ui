import { HotelAvailabilityResponse } from '../models/hotel/search-models/hotelAvailabilityResponse'
import {
  ActionNightCount,
  HotelAvailabilityRequestAction,
  HotelAvailabilityResponseAction,
} from '../models/actionModels/search'
import { HotelAvailabilityRequest } from '../models/hotel/search-models/hotelAvailabilityRequest'

export function hotelSearchAvailabilityRequestAction(
  hotelAvailabilityRequest: HotelAvailabilityRequest,
): HotelAvailabilityRequestAction {
  return {
    type: 'HOTEL_AVAILABILITY_REQUEST',
    payload: hotelAvailabilityRequest,
  }
}
export function hotelSearchAvailabilityResponseAction(
  hotelAvailabilityResponse: HotelAvailabilityResponse,
): HotelAvailabilityResponseAction {
  return {
    type: 'HOTEL_AVAILABILITY_RESPONSE',
    payload: hotelAvailabilityResponse,
  }
}

export function nightCountAction(days: number): ActionNightCount {
  return {
    type: 'DAYS',
    payload: days,
  }
}
