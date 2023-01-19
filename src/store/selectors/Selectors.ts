import { IRootState } from '../reducers/rootReducer'

export const getAccessToken = (state: IRootState) => state.token.accessToken
export const getRefreshToken = (state: IRootState) => state.token.refreshToken
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
export const getHotelAvailabilityResponse = (state: IRootState) =>
  state.hotel.availabilityResponse.hotelAvailabilityResponse
export const getAuthState = (state: IRootState) => state.pkce.authState
export const getVerifier = (state: IRootState) => state.pkce.codeVerifier
export const getCodeChallenge = (state: IRootState) => state.pkce.codeChallenge
export const getLocationState = (state: IRootState) =>
  state.hotel.location.location
export const getIsLoading = (state: IRootState) => state.loader.showLoading
export const getFirstName = (state: IRootState) =>
  state.userDetails.userDetails.firstName
export const getLastName = (state: IRootState) =>
  state.userDetails.userDetails.lastName
