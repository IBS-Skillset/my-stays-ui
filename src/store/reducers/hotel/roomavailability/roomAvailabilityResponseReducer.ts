import { RoomAvailabilityResponse } from '../../../../models/hotel/roomavailability-models/roomAvailabilityResponse'
import { RoomAvailabilityResponseAction } from '../../../actionModels/search'

const roomAvailability: RoomAvailabilityResponse = {
  responseStatus: { status: -1 },
  hotelCode: '',
  rateList: [
    {
      bookingCode: '',
      available: '',
      rateCategory: '',
      amount: 0,
      totalAmount: 0,
      currency: '',
      ratePlan: '',
      rateType: '',
      isCancellable: false,
      isCVVRequired: false,
      isBreakfastIncluded: false,
      hotelCode: '',
      roomDescriptionList: [{ description: '' }],
      breakFastDetails: [{ breakfast: '' }],
    },
  ],
}
const initialState = {
  roomAvailabilityResponse: roomAvailability,
}
export const roomAvailabilityResponseReducer = (
  state = initialState,
  action: RoomAvailabilityResponseAction,
) => {
  switch (action.type) {
    case 'ROOM_AVAILABILITY_RESPONSE':
      return {
        ...state,
        roomAvailabilityResponse: action.payload,
      }
    default:
      return { ...state }
  }
}
