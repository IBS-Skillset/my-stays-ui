import { Rate } from '../../../../models/hotel/roomavailability-models/roomAvailabilityResponse'
import { ActionRate } from '../../../actionModels/search'

const rateSelected: Rate = {
  bookingCode: '',
  rateCategory: '',
  available: '',
  amount: 0,
  totalAmount: 0,
  currency: '',
  ratePlan: '',
  rateType: '',
  isCancellable: false,
  isBreakfastIncluded: false,
  isCVVRequired: false,
  hotelCode: '',
  roomDescriptionList: [{ description: '' }],
  breakFastDetails: [{ breakfast: '' }],
}
const initialState = {
  rate: rateSelected,
}
export const rateReducer = (state = initialState, action: ActionRate) => {
  switch (action.type) {
    case 'SELECT_RATE':
      return {
        ...state,
        rate: action.payload,
      }
    default:
      return { ...state }
  }
}
