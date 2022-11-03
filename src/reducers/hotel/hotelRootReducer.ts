import { combineReducers } from 'redux'
import { hotelAvailabilityRequestReducer } from './availability/hotelAvailabilityRequestReducer'
import { hotelAvailabilityResponseReducer } from './availability/hotelAvailabilityResponseReducer'
import { nightCountReducer } from './availability/nightCountReducer'

export const hotelRootReducer = combineReducers({
  availabilityRequest: hotelAvailabilityRequestReducer,
  availabilityResponse: hotelAvailabilityResponseReducer,
  nightCount: nightCountReducer,
})
