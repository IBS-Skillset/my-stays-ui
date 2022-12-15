import axios from 'axios'

const MY_TRIPS_BASE_URL = `http://${process.env.DOMAIN}:${process.env.HOTEL_SERVICE_PORT}/book-query/api/myTrips`

class MyTripsService {
  getMyTrips() {
    return axios.get(MY_TRIPS_BASE_URL)
  }
}

export default new MyTripsService()
