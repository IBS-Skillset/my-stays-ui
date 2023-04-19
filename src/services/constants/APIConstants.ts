/**let HOST = (window as any).API_GATEWAY_URI*/
let HOST = 'http://' + window.location.host + '/api-gateway'
if (process.env.NODE_ENV === 'development') {
  HOST = `${process.env.API_GATEWAY_URI}`
}
export default {
  CREATE_ACCOUNT_URL: `${HOST}/account/api/signup`,
  USER_DETAILS_URL: `${HOST}/account/api/userdetails/`,
  GOOGLE_API_URL: `${HOST}/googleApi/`,
  HOTEL_AVAILABILITY_URL: `${HOST}/hotel-search-service/api/availability`,
  HOTEL_DESCRIPTION_URL: `${HOST}/hotel-search-service/api/description`,
  HOTEL_ROOM_AVAILABILITY_URL: `${HOST}/hotel-search-service/api/roomAvailability`,
  HOTEL_REPRICE_URL: `${HOST}/hotel-book-service/api/raterule`,
  HOTEL_BOOK_URL: `${HOST}/hotel-book/api/book`,
  MY_TRIPS_URL: `${HOST}/book-query/api/myTrips`,
}
