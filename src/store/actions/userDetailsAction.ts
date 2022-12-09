import { UserDetails } from '../../models/user-model/userDetails'
import { ActionUserDetails } from '../actionModels/user'

export function fetchUserDetails(UserDetails: UserDetails): ActionUserDetails {
  return {
    type: 'USER_DETAILS',
    payload: UserDetails,
  }
}
