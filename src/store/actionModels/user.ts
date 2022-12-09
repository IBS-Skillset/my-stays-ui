import { UserDetails } from '../../models/user-model/userDetails'

export interface ActionUserDetails {
  type: string
  payload: UserDetails
}
