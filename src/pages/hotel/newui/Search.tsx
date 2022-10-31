import './Search.scss'
import calendarSVG from '../../../assets/svg/calendar.svg'
import locationSVG from '../../../assets/svg/location.svg'
import personSVG from '../../../assets/svg/person.svg'
import React, { useEffect, useState } from 'react'
import { FaBuilding, FaCar } from 'react-icons/fa'
import { IoAirplane } from 'react-icons/io5'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import GeoLocationService from '../../../services/geolocation/GeoLocationService'
import { AxiosResponse } from 'axios'
import { GeoPlace, GeoPlaces } from '../../../models/locations/geoPlace'
import { GeoLocation } from '../../../models/locations/geoLocation'
import { HotelAvailabilityRequest } from '../../../models/hotel/search-models/hotelAvailabilityRequest'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import HotelSearchService from '../../../services/hotel/HotelSearchService'
import { HotelAvailabilityResponse } from '../../../models/hotel/search-models/hotelAvailabilityResponse'
import { intervalToDuration } from 'date-fns'
import { IRootState } from '../../../reducers/rootReducer'
import { useSelector } from 'react-redux'
import DispatchPkceData from '../../../setup/oauth2/pkce/DispatchPkceData'
import AuthorizeUser from '../../../setup/oauth2/components/AuthorizeUser'

interface IFormInputs {
  location: string
}

function Search() {
  const [searchTerm, setSearchTerm] = useState('')
  const [geoPlaces, setGeoPlaces] = useState<GeoPlaces>()
  const [startDate, setStartDate] = useState<Date | null | undefined>(null)
  const [endDate, setEndDate] = useState<Date | null | undefined>(null)
  const [hotelAvailabilityRequest, setHotelAvailabilityRequest] =
    useState<HotelAvailabilityRequest>({
      latitude: '',
      longitude: '',
      checkInDate: new Date(),
      checkOutDate: new Date(),
    })
  const [, setHotelAvailabilityResponse] = useState<HotelAvailabilityResponse>()
  const [, setNightcount] = useState(0)

  const formSchema = Yup.object().shape({
    location: Yup.string().required('*Location is required'),
  })

  const { register, handleSubmit, setError } = useForm<IFormInputs>({
    resolver: yupResolver(formSchema),
    mode: 'onSubmit',
  })

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length > 2 && !searchTerm.includes('Location:')) {
        searchGeoPlaces(searchTerm)
      }
    }, 3000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  const accessToken = useSelector(
    (state: IRootState) => state.token.accessToken,
  )
  const isAuthorized = useSelector(
    (state: IRootState) => state.authorize.isAuthorized,
  )
  if (accessToken == '') {
    if (!isAuthorized) {
      DispatchPkceData()
    }
    return <AuthorizeUser />
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGeoPlaces({ ...geoPlaces, place: [] })
    setSearchTerm(event.target.value)
  }

  function searchGeoPlaces(search: string) {
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

  const handlePlaceIdChange = (geoPlace: GeoPlace) => {
    setSearchTerm('Location: ' + geoPlace.description)
    getAndSetLocationLatLong(geoPlace.placeId)
    setGeoPlaces({ ...geoPlaces, place: [] })
  }

  const handlestartdate = (date: Date) => {
    setStartDate(date)
    setHotelAvailabilityRequest({
      ...hotelAvailabilityRequest,
      checkInDate: date,
    })
  }
  const handleenddate = (date: Date) => {
    setEndDate(date)
    setHotelAvailabilityRequest({
      ...hotelAvailabilityRequest,
      checkOutDate: date,
    })
  }

  const getHotelAvailability: SubmitHandler<IFormInputs> = () => {
    if (typeof startDate === 'undefined' || typeof endDate === 'undefined') {
      return
    }
    if (
      hotelAvailabilityRequest.latitude === '' ||
      hotelAvailabilityRequest.longitude === ''
    ) {
      setSearchTerm('')
      setError('location', {
        type: 'manual',
        message: 'Search a Location',
      })
      return
    }
    if (
      hotelAvailabilityRequest.checkInDate ===
      hotelAvailabilityRequest.checkOutDate
    ) {
      setError('location', {
        type: 'manual',
        message: 'Incorrect Date Range',
      })
      return
    }
    HotelSearchService.getHotelAvailabilitySearch(hotelAvailabilityRequest)
      .then((response: AxiosResponse<HotelAvailabilityResponse>) => {
        setHotelAvailabilityResponse(response.data)
        const days = intervalToDuration({
          start: hotelAvailabilityRequest.checkInDate,
          end: hotelAvailabilityRequest.checkOutDate,
        }).days
        typeof days != 'undefined' && setNightcount(days)
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
        setHotelAvailabilityResponse({
          responseStatus: { status: -1 },
          hotelItem: [],
        })
      })
  }

  return (
    <div className="main">
      <form
        className="inner-form"
        onSubmit={handleSubmit(getHotelAvailability)}
      >
        <div className="heading">Search Hotels</div>
        <div className="travel-type-wrap">
          <div className="item active">
            <div className="group-icon">
              <FaBuilding className="icon" />
            </div>
            <div className="text">HOTEL ONLY</div>
          </div>
          <div className="item cursor">
            <div className="group-icon">
              <FaBuilding className="icon" />
              <IoAirplane className="icon" />
            </div>
            <div className="text">HOTEL + FLIGHT</div>
          </div>
          <div className="item cursor">
            <div className="group-icon">
              <FaBuilding className="icon" />
              <IoAirplane className="icon" />
              <FaCar className="icon" />
            </div>
            <div className="text">HOTEL + FLIGHT + CAR</div>
          </div>
          <div className="item cursor">
            <div className="group-icon">
              <FaBuilding className="icon" />
              <FaCar className="icon" />
            </div>
            <div className="text">HOTEL + CAR</div>
          </div>
        </div>
        <div className="main-form">
          <div className="bg-white rounded-sm h-16 mb-2 relative">
            <div className="icon-wrap">
              <img src={locationSVG} alt="" className="svg-image" />
            </div>
            <div className="input-field">
              <label className="label">
                GOING TO
                <input
                  value={searchTerm}
                  className="input"
                  type="text"
                  placeholder="Destination, hotel name"
                  autoComplete="off"
                  {...register('location', {
                    onChange: (e) => {
                      handleSearch(e)
                    },
                  })}
                />
                <div
                  className="absolute z-50 p-6 max-w-sm grid bg-white rounded-sm border border-gray-200 shadow-md dark:bg-slate-50 dark:border-gray-400"
                  style={{
                    display:
                      typeof geoPlaces != 'undefined' &&
                      geoPlaces.place.length > 0
                        ? 'block'
                        : 'none',
                  }}
                >
                  {typeof geoPlaces != 'undefined' &&
                    geoPlaces.place.map((geoPlace) => {
                      return (
                        <div
                          className="location-items"
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
          <div className="box-border flex h-16 mb-2 p-5">
            <div className="input-wrap">
              <div className="icon-wrap">
                <img src={calendarSVG} alt="" className="svg-image" />
              </div>
              <div className="input-field">
                <div className="label">
                  CHECK IN
                  <div className="input">
                    <DatePicker
                      className="picker"
                      placeholderText="mm/dd/yyyy"
                      selected={startDate}
                      onChange={handlestartdate}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="input-wrap1">
              <div className="icon-wrap">
                <img src={calendarSVG} alt="" className="svg-image" />
              </div>
              <div className="input-field">
                <div className="label">
                  CHECK OUT
                  <div className="input">
                    <DatePicker
                      className="picker"
                      placeholderText="mm/dd/yyyy"
                      selected={endDate}
                      onChange={handleenddate}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="input-wrap3">
              <div className="icon-wrap">
                <img src={personSVG} alt="" className="svg-image" />
              </div>
              <div className="input-field">
                <label className="label">
                  TRAVELERS
                  <input className="input" type="text" placeholder="1 adult" />
                </label>
              </div>
            </div>
          </div>
          <div className="h-12 p-10">
            <button className="btn-search">Search</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Search
