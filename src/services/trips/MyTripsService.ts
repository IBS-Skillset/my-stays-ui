import axios from 'axios'
import APIConstants from '../constants/APIConstants'

class MyTripsService {
  getMyTrips() {
    return axios.get(APIConstants.MY_TRIPS_URL)
  }
}

export default new MyTripsService()
