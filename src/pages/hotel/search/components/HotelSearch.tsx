import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosResponse } from 'axios'
import { intervalToDuration } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import calendarSVG from '../../../../assets/svg/calendar.svg'
import locationSVG from '../../../../assets/svg/location.svg'
import personSVG from '../../../../assets/svg/person.svg'
import map from '../../../../assets/images/map.jpg'
import searchIcon from '../../../../assets/images/search-icon.png'
import { HotelAvailabilityRequest } from '../../../../models/hotel/search-models/hotelAvailabilityRequest'
import { HotelAvailabilityResponse } from '../../../../models/hotel/search-models/hotelAvailabilityResponse'
import { GeoLocation } from '../../../../models/locations/geoLocation'
import { GeoPlace, GeoPlaces } from '../../../../models/locations/geoPlace'
import GeoLocationService from '../../../../services/geolocation/GeoLocationService'
import HotelSearchService from '../../../../services/hotel/HotelSearchService'
import './HotelSearch.scss'

import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../../reducers/rootReducer'
import AuthorizeUser from '../../../../setup/oauth2/components/AuthorizeUser'
import DispatchPkceData from '../../../../setup/oauth2/pkce/DispatchPkceData'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import HotelAvailability from './search-results/HotelAvailability'
import {
  hotelSearchAvailabilityRequestAction,
  hotelSearchAvailabilityResponseAction,
  locationAction,
  nightCountAction,
} from '../../../../actions/hotelSearchAction'

interface IFormInputs {
  location: string
}

function HotelSearch() {
  const [searchTermChange, setSearchTermChange] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [geoPlaces, setGeoPlaces] = useState<GeoPlaces>()
  const [hotelAvailabilityResponse, setHotelAvailabilityResponse] =
    useState<HotelAvailabilityResponse>()
  const [hotelAvailabilityRequest, setHotelAvailabilityRequest] =
    useState<HotelAvailabilityRequest>({
      latitude: '',
      longitude: '',
      checkInDate: new Date(),
      checkOutDate: new Date(),
    })
  const [nights, setNightcount] = useState(0)
  const [startDate, setStartDate] = useState<Date | null | undefined>(null)
  const [endDate, setEndDate] = useState<Date | null | undefined>(null)
  const dispatch = useDispatch()

  const formSchema = Yup.object().shape({
    location: Yup.string().required('*Location is required'),
  })

  const { register, handleSubmit, setError } = useForm<IFormInputs>({
    resolver: yupResolver(formSchema),
    mode: 'onSubmit',
  })

  const hotelAvailabilityRequestState: HotelAvailabilityRequest = useSelector(
    (state: IRootState) =>
      state.hotel.availabilityRequest.hotelAvailabilityRequest,
  )
  const hotelAvailabilityResponseState: HotelAvailabilityResponse = useSelector(
    (state: IRootState) =>
      state.hotel.availabilityResponse.hotelAvailabilityResponse,
  )
  const nightCountState: number = useSelector(
    (state: IRootState) => state.hotel.nightCount.days,
  )
  const locationState: string = useSelector(
    (state: IRootState) => state.hotel.location.location,
  )

  const accessToken = useSelector(
    (state: IRootState) => state.token.accessToken,
  )
  const isAuthorized = useSelector(
    (state: IRootState) => state.authorize.isAuthorized,
  )

  useEffect(() => {
    if (
      hotelAvailabilityResponseState &&
      typeof hotelAvailabilityResponseState.hotelItem != 'undefined' &&
      hotelAvailabilityResponseState.hotelItem.length > 0
    ) {
      setHotelAvailabilityRequest(hotelAvailabilityRequestState)
      setHotelAvailabilityResponse(hotelAvailabilityResponseState)
      setNightcount(nightCountState)
      setSearchTerm(locationState)
      setStartDate(hotelAvailabilityRequestState.checkInDate)
      setEndDate(hotelAvailabilityRequestState.checkOutDate)
    }
  }, [hotelAvailabilityResponseState])

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

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length > 2) {
        searchGeoPlaces(searchTerm)
      }
    }, 3000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTermChange])

  if (accessToken == '') {
    if (!isAuthorized) {
      DispatchPkceData()
    }
    return <AuthorizeUser />
  }

  const getHotelAvailability: SubmitHandler<IFormInputs> = () => {
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
        dispatch(hotelSearchAvailabilityRequestAction(hotelAvailabilityRequest))
        dispatch(hotelSearchAvailabilityResponseAction(response.data))
        const days = intervalToDuration({
          start: hotelAvailabilityRequest.checkInDate,
          end: hotelAvailabilityRequest.checkOutDate,
        }).days
        typeof days != 'undefined' && dispatch(nightCountAction(days))
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
        dispatch(
          hotelSearchAvailabilityResponseAction({
            responseStatus: { status: -1 },
            hotelItem: [],
          }),
        )
      })
    console.log(hotelAvailabilityRequest)
    console.log(hotelAvailabilityResponse)
    console.log(nights)
  }
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGeoPlaces({ ...geoPlaces, place: [] })
    setSearchTerm(event.target.value)
    setSearchTermChange(event.target.value)
  }

  const handlePlaceIdCahange = (geoPlace: GeoPlace) => {
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
          'An error occured while calling GeoLocation Details' + error,
        )
      })
  }

  function searchGeoPlaces(searchTerm: string) {
    GeoLocationService.getGeolocationPlaceIds(searchTerm)
      .then((response: AxiosResponse<GeoPlaces>) => {
        setGeoPlaces(response.data)
      })
      .catch((error) => {
        console.log('An error occured while calling GeoLocation Places' + error)
      })
  }

  return (
    <>
      <div className="main-content">
        <div className="mt-2">
          <form
            className="search-container"
            onSubmit={handleSubmit(getHotelAvailability)}
          >
            <div className="destination-field">
              <div className="h-10 ml-1 w-6">
                <img src={locationSVG} alt="" className="mt-4 w-5" />
              </div>
              <div className="field-destination">
                <label className="label-field-dest">
                  GOING TO
                  <input
                    value={searchTerm}
                    className="input-value-dest"
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
                            className="text-sm"
                            onClickCapture={() =>
                              handlePlaceIdCahange(geoPlace)
                            }
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
            <div className="search-param">
              <div className="h-10 ml-1 w-6">
                <img src={calendarSVG} alt="" className="mt-4 w-5" />
              </div>
              <div className="h-10 ml-1 w-35">
                <div className="label-field">CHECK IN</div>
                <div className="date-picker-value">
                  <DatePicker
                    className="date-picker"
                    placeholderText="mm/dd/yyyy"
                    selected={startDate}
                    onChange={handlestartdate}
                  />
                </div>
              </div>
            </div>
            <div className="search-param">
              <div className="h-10 ml-1 w-6">
                <img src={calendarSVG} alt="" className="mt-4 w-5" />
              </div>
              <div className="h-10 ml-1 w-32">
                <div className="label-field">CHECK OUT</div>
                <div className="date-picker-value">
                  <DatePicker
                    className="date-picker"
                    placeholderText="mm/dd/yyyy"
                    selected={endDate}
                    onChange={handleenddate}
                  />
                </div>
              </div>
            </div>
            <div className="search-param">
              <div className="h-10 ml-1 w-6">
                <img src={personSVG} alt="" className="mt-4 w-5" />
              </div>
              <div className="h-10 ml-1 w-32">
                <div className="field-destination">
                  <label className="label">
                    TRAVELERS
                    <input
                      className="input-value-dest"
                      type="text"
                      placeholder="1 adult"
                    />
                  </label>
                </div>
              </div>
            </div>
            <button className="button">Search</button>
          </form>
        </div>
        <div className="mt-2">
          <div className="sorting-container">
            <div className="sort">Sort</div>
            <div className="best-match">Best match</div>
            <div className="match">Top Viewed</div>
            <div className="lowest-price">Lowest price first</div>
            <div className="match">Distance</div>
          </div>
          <div className="flex mt-5 ml-24">
            <div className="ml-8 w-64">
              <div className="h-40 w-64">
                <img src={map} alt="" className="h-40 w-64" />
              </div>
              <div className="border-black border-solid border-t mt-6 w-64">
                <h1 className="search-heading">Search by property name</h1>
                <div className="border-black rounded border-solid border flex h-10 mt-5 text-left w-64">
                  <img src={searchIcon} alt="" className="h-6 mt-2 ml-2 w-6" />
                  <h1 className="mt-2 ml-2">eg: Marriot</h1>
                </div>
                <div className="border-black border-solid border-t mt-5">
                  <h1 className="hotel-chains-heading">Hotel Chains</h1>
                  <div className="mt-2 w-64">
                    <input className="mr-2" type="checkbox" />
                    Accor
                  </div>
                  <div className="mt-2 w-64">
                    <input className="mr-2" type="checkbox" />
                    Bloom Hotels
                  </div>
                  <div className="mt-2 w-64">
                    <input className="mr-2" type="checkbox" />
                    Clark Inn
                  </div>
                  <div className="mt-2 w-64">
                    <input className="mr-2" type="checkbox" />
                    Hyatt
                  </div>
                  <div className="mt-2 w-64">
                    <input className="mr-2" type="checkbox" />
                    Crown Plaza
                  </div>
                </div>
              </div>
            </div>
            <div className="search-result">
              {typeof hotelAvailabilityResponse != 'undefined' &&
              typeof hotelAvailabilityResponse.hotelItem != 'undefined' &&
              hotelAvailabilityResponse.hotelItem.length > 0 ? (
                <HotelAvailability />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HotelSearch
