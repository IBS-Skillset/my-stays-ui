import axios from 'axios'
import APIConstants from '../constants/APIConstants'

class UserDetailsService {
  getUserDetails(email: string) {
    return axios.get(APIConstants.USER_DETAILS_URL + email)
  }
}
export default new UserDetailsService()
