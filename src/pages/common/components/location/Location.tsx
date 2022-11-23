import locationSVG from '../../../../assets/svg/location.svg'
import React, { Dispatch, useEffect, useState } from 'react'
import GeoLocationService from '../../../../services/geolocation/GeoLocationService'
import { AxiosResponse } from 'axios'
import { GeoPlace, GeoPlaces } from '../../../../models/locations/geoPlace'
import { locationAction } from '../../../../store/actions/hotelSearchAction'
import { useDispatch } from 'react-redux'
import { GeoLocation } from '../../../../models/locations/geoLocation'
import { HotelAvailabilityRequest } from '../../../../models/hotel/search-models/hotelAvailabilityRequest'

type Props = {
  searchTerm: string
  setSearchTerm: Dispatch<string>
  hotelAvailabilityRequest: HotelAvailabilityRequest
  setHotelAvailabilityRequest: Dispatch<HotelAvailabilityRequest>
  register: any
}
const Location = ({
  searchTerm,
  setSearchTerm,
  hotelAvailabilityRequest,
  setHotelAvailabilityRequest,
  register,
}: Props) => {
  const [searchTermChange, setSearchTermChange] = useState('')
  const [geoPlaces, setGeoPlaces] = useState<GeoPlaces>()
  const dispatch = useDispatch()
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length > 2) {
        searchGeoPlaces(searchTerm)
      }
    }, 3000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTermChange])
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGeoPlaces({ ...geoPlaces, place: [] })
    setSearchTerm(event.target.value)
    setSearchTermChange(event.target.value)
  }

  const searchGeoPlaces = (search: string) => {
    GeoLocationService.getGeolocationPlaceIds(search)
      .then((response: AxiosResponse<GeoPlaces>) => {
        setGeoPlaces(response.data)
      })
      .catch((error) => {
        console.log(
          'An error occurred while calling GeoLocation Places' + error,
        )
      })
  }
  const handlePlaceIdChange = (geoPlace: GeoPlace) => {
    setSearchTerm(geoPlace.description)
    getAndSetLocationLatLong(geoPlace.placeId)
    setGeoPlaces({ ...geoPlaces, place: [] })
    dispatch(locationAction(geoPlace.description))
  }
  const getAndSetLocationLatLong = (placeId: string) => {
    GeoLocationService.getGeolocationLatitudeAndLongitude(placeId)
      .then((response: AxiosResponse<GeoLocation>) => {
        setHotelAvailabilityRequest({
          ...hotelAvailabilityRequest,
          latitude: response.data.latitude,
          longitude: response.data.longitude,
        })
      })
      .catch((error) => {
        console.log(
          'An error occurred while calling GeoLocation Details' + error,
        )
      })
  }

  return (
    <div className="location-container">
      <div className="location-image-container">
        <img src={locationSVG} alt="" className="location-image" />
      </div>
      <div className="location-input-container">
        <label className="location-label">
          GOING TO
          <input
            value={searchTerm}
            className="location-input"
            type="text"
            placeholder="Destination, hotel name"
            autoComplete="off"
            {...register('location', {
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                handleSearch(e)
              },
            })}
          />
          <div
            className="location-display-container"
            style={{
              display:
                typeof geoPlaces != 'undefined' && geoPlaces.place.length > 0
                  ? 'block'
                  : 'none',
            }}
          >
            {typeof geoPlaces != 'undefined' &&
              geoPlaces.place.map((geoPlace) => {
                return (
                  <div
                    className="text-sm"
                    onClickCapture={() => handlePlaceIdChange(geoPlace)}
                    id={geoPlace.placeId}
                    key={geoPlace.placeId}
                  >
                    {geoPlace.description}
                  </div>
                )
              })}
          </div>
        </label>
      </div>
    </div>
  )
}

export default Location
