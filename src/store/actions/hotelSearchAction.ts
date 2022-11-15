import { HotelAvailabilityResponse } from '../../models/hotel/search-models/hotelAvailabilityResponse'
import {
  ActionHotelCode,
  ActionLocation,
  ActionNightCount,
  HotelAvailabilityRequestAction,
  HotelAvailabilityResponseAction,
  HotelDescriptionResponseAction,
  RoomAvailabilityResponseAction,
} from '../actionModels/search'
import { HotelAvailabilityRequest } from '../../models/hotel/search-models/hotelAvailabilityRequest'
import { HotelDescriptionResponse } from '../../models/hotel/description-models/hotelDescriptionResponse'
import { RoomAvailabilityResponse } from '../../models/hotel/roomavailability-models/roomAvailabilityResponse'

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

export function roomAvailabilityResponseAction(
  roomAvailabilityResponse: RoomAvailabilityResponse,
): RoomAvailabilityResponseAction {
  return {
    type: 'ROOM_AVAILABILITY_RESPONSE',
    payload: roomAvailabilityResponse,
  }
}

export function hotelCodeAction(hotelCode: string): ActionHotelCode {
  return {
    type: 'HOTEL_CODE',
    payload: hotelCode,
  }
}
