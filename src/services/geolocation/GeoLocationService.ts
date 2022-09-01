import axios from 'axios'

const GEO_LOCATION_BASE_URL =
  'http://localhost:8081/googleApi/autoComplete?input='

class GeoLocation {
  getGeolocationPlaceIds(place: string) {
    return axios.get(GEO_LOCATION_BASE_URL + place)
  }
}

export default new GeoLocation()
