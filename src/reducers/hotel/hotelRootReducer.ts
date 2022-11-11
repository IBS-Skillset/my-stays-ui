import { combineReducers } from 'redux'
import { hotelAvailabilityRequestReducer } from './availability/hotelAvailabilityRequestReducer'
import { hotelAvailabilityResponseReducer } from './availability/hotelAvailabilityResponseReducer'
import { nightCountReducer } from './availability/nightCountReducer'
import { locationReducer } from './availability/locationReducer'
import { hotelDescriptionResponseReducer } from './description/hotelDescriptionResponseReducer'

export const hotelRootReducer = combineReducers({
  availabilityRequest: hotelAvailabilityRequestReducer,
  availabilityResponse: hotelAvailabilityResponseReducer,
  nightCount: nightCountReducer,
  location: locationReducer,
  descriptionResponse: hotelDescriptionResponseReducer,
})
