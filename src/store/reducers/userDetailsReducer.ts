import { UserDetails } from '../../models/user-model/userDetails'
import { ActionUserDetails } from '../actionModels/user'

const userDetails: UserDetails = {
  email: '',
  firstName: '',
  id: '',
  lastName: '',
  phone: '',
  role: '',
  address: {
    address: '',
    city: '',
    country: '',
    type: '',
    zipcode: '',
  },
}
const initialState = { userDetails: userDetails }

export const userDetailsReducer = (
  state = initialState,
  action: ActionUserDetails,
) => {
  switch (action.type) {
    case 'USER_DETAILS':
      return {
        ...state,
        userDetails: action.payload,
      }
    default:
      return { ...state }
  }
}
