import { HotelRepriceResponse } from '../../../../models/hotel/reprice-models/hotelRepriceResponse'
import { ActionRate } from '../../../actionModels/search'

const rateSelected: HotelRepriceResponse = {
  responseStatus: { status: 0 },
  hotelCode: '',
  ratePlanId: '',
  currencyCode: '',
  amount: 0,
  cancelPolicyDeadLine: '',
  penaltyDescriptionText: '',
  isCancellable: false,
  isBreakfastIncluded: false,
}
const initialState = {
  rate: rateSelected,
  initialRoomPrice: 0,
  nightlyPrice: 0,
}
export const rateReducer = (state = initialState, action: ActionRate) => {
  switch (action.type) {
    case 'SELECT_RATE':
      return {
        ...state,
        rate: action.payload,
        initialRoomPrice: action.initialRate,
        nightlyPrice: action.nightlyPrice,
      }
    default:
      return { ...state }
  }
}
