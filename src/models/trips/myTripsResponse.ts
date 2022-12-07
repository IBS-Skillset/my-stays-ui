export interface MyTripsResponse {
  message: string
  myTrips: Trip[]
}

export interface Trip {
  bookingId: string
  bookingDate: string
  hotelName: string
  checkInDate: string
  checkOutDate: string
  totalPrice: number
  currencyCode: string
  freeCancellationUntil: string | null | undefined
}
