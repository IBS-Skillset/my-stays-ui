import axios from 'axios'

const GEO_LOCATION_BASE_URL = 'http://localhost:8081/googleApi/'

class GeoLocation {
  getGeolocationPlaceIds(place: string) {
    return axios.get(GEO_LOCATION_BASE_URL + 'autoComplete?input=' + place)
  }
  getGeolocationLatitudeAndLongitude(placeId: string) {
    return axios.get(GEO_LOCATION_BASE_URL + 'placeId?placeId=' + placeId)
  }
}

export default new GeoLocation()
