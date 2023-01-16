import axios from 'axios'
import APIConstants from '../constants/APIConstants'

class GeoLocation {
  getGeolocationPlaceIds(place: string) {
    return axios.get(
      APIConstants.GOOGLE_API_URL + 'autoComplete?input=' + place,
    )
  }
  getGeolocationLatitudeAndLongitude(placeId: string) {
    return axios.get(APIConstants.GOOGLE_API_URL + 'placeId?placeId=' + placeId)
  }
}

export default new GeoLocation()
