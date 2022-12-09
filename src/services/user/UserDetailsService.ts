import axios from 'axios'

const USER_DETAILS_URL = `http://${process.env.DOMAIN}:${process.env.HOTEL_SERVICE_PORT}/account/api/userdetails/`
class UserDetailsService {
  getUserDetails(email: string) {
    return axios.get(`${USER_DETAILS_URL}${email}`)
  }
}
export default new UserDetailsService()
