/*import axios from 'axios'*/
// eslint-disable-next-line jest/no-mocks-import
import myTripsResponse from '../../__mocks__/myTripsResponse'
import { MyTripsResponse } from '../../models/trips/myTripsResponse'

//const MY_TRIPS_BASE_URL = `http://${process.env.DOMAIN}:${process.env.HOTEL_SERVICE_PORT}/hotel-book-service/api/trips`

class MyTripsService {
  getMyTrips() {
    /*return axios.get(MY_TRIPS_BASE_URL)*/
    return new Promise<MyTripsResponse>((resolve) => {
      resolve(myTripsResponse.trips)
    })
  }
}

export default new MyTripsService()
