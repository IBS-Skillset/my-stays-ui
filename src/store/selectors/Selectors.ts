import { IRootState } from '../reducers/rootReducer'

export const getAccessToken = (state: IRootState) => state.token.accessToken
export const getIsAuthorized = (state: IRootState) =>
  state.authorize.isAuthorized
export const getEmail = (state: IRootState) => state.email.email
export const getBookResponse = (state: IRootState) =>
  state.hotel.bookResponse.bookResponse
export const getDays = (state: IRootState) => state.hotel.nightCount.days
export const getRepriceResponse = (state: IRootState) => state.hotel.rate.rate
export const getNightlyPrice = (state: IRootState) =>
  state.hotel.rate.nightlyPrice
export const getInitialRoomPrice = (state: IRootState) =>
  state.hotel.rate.initialRoomPrice
export const getHotelAvailabilityRequest = (state: IRootState) =>
  state.hotel.availabilityRequest.hotelAvailabilityRequest
export const getHotelDescriptionResponses = (state: IRootState) =>
  state.hotel.descriptionResponse.hotelDescriptionResponsesPerCode
export const getUserDetails = (state: IRootState) =>
  state.userDetails.userDetails
export const getAutoFillEmail = (state: IRootState) =>
  state.signup.autoFillEmail
export const getIsLoggedOut = (state: IRootState) => state.logout.isLoggedOut
export const getIsSessionOut = (state: IRootState) =>
  state.sessionOut.isSessionOut
