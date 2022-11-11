import { HotelAvailabilityResponse } from '../models/hotel/search-models/hotelAvailabilityResponse'
import {
  ActionLocation,
  ActionNightCount,
  HotelAvailabilityRequestAction,
  HotelAvailabilityResponseAction,
  HotelDescriptionResponseAction,
} from '../models/actionModels/search'
import { HotelAvailabilityRequest } from '../models/hotel/search-models/hotelAvailabilityRequest'
import { HotelDescriptionResponse } from '../models/hotel/description-models/hotelDescriptionResponse'

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

export function locationAction(location: string): ActionLocation {
  return {
    type: 'LOCATION',
    payload: location,
  }
}

export function hotelSearchDescriptionResponseAction(
  hotelCode: string,
  hotelDescriptionResponse: HotelDescriptionResponse,
): HotelDescriptionResponseAction {
  return {
    type: 'ADD_HOTEL_DESCRIPTION_RESPONSE',
    hotelCode: hotelCode,
    payload: hotelDescriptionResponse,
  }
}
