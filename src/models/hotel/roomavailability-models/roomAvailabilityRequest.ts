export interface RoomAvailabilityRequest {
  hotelCode: string
  checkInDate: Date
  checkOutDate: Date
  languageCode: string
  nightsNeeded: number
  roomCount: number
  occupancy: number
}
