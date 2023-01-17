import { IRootState } from '../../../store/reducers/rootReducer'

export const getAccessToken = (state: IRootState) => state.token.accessToken
export const getIsAuthorized = (state: IRootState) =>
  state.authorize.isAuthorized
export const getEmail = (state: IRootState) => state.email.email
export const getBookResponse = (state: IRootState) =>
  state.hotel.bookResponse.bookResponse
export const getDays = (state: IRootState) => state.hotel.nightCount.days
