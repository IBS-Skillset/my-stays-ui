import locationSVG from '../../../../../assets/svg/location.svg'
import calendarSVG from '../../../../../assets/svg/calendar.svg'
import DatePicker from 'react-datepicker'
import personSVG from '../../../../../assets/svg/person.svg'
import React, { useEffect, useState } from 'react'
import { GeoPlace, GeoPlaces } from '../../../../../models/locations/geoPlace'
import { HotelAvailabilityResponse } from '../../../../../models/hotel/search-models/hotelAvailabilityResponse'
import { HotelAvailabilityRequest } from '../../../../../models/hotel/search-models/hotelAvailabilityRequest'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import HotelSearchService from '../../../../../services/hotel/HotelSearchService'
import { AxiosResponse } from 'axios'
import {
  hotelSearchAvailabilityRequestAction,
  hotelSearchAvailabilityResponseAction,
  locationAction,
  nightCountAction,
} from '../../../../../store/actions/hotelSearchAction'
import { intervalToDuration } from 'date-fns'
import GeoLocationService from '../../../../../services/geolocation/GeoLocationService'
import { GeoLocation } from '../../../../../models/locations/geoLocation'
import './SearchForm.css'
import { IRootState } from '../../../../../store/reducers/rootReducer'

interface IFormInputs {
  location: string
}

function SearchForm() {
  const [searchTermChange, setSearchTermChange] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [geoPlaces, setGeoPlaces] = useState<GeoPlaces>()
  const [hotelAvailabilityRequest, setHotelAvailabilityRequest] =
    useState<HotelAvailabilityRequest>({
      latitude: '',
      longitude: '',
      checkInDate: new Date(),
      checkOutDate: new Date(),
    })
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

  const locationState: string = useSelector(
    (state: IRootState) => state.hotel.location.location,
  )

  const hotelAvailabilityRequestState: HotelAvailabilityRequest = useSelector(
    (state: IRootState) =>
      state.hotel.availabilityRequest.hotelAvailabilityRequest,
  )

  useEffect(() => {
    setSearchTerm(locationState)
    setStartDate(hotelAvailabilityRequestState.checkInDate)
    setEndDate(hotelAvailabilityRequestState.checkOutDate)
  }, [hotelAvailabilityRequestState])

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
          'An error occurred while calling GeoLocation Details' + error,
        )
      })
  }

  function searchGeoPlaces(searchTerm: string) {
    GeoLocationService.getGeolocationPlaceIds(searchTerm)
      .then((response: AxiosResponse<GeoPlaces>) => {
        setGeoPlaces(response.data)
      })
      .catch((error) => {
        console.log(
          'An error occurred while calling GeoLocation Places' + error,
        )
      })
  }

  return (
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
                        onClickCapture={() => handlePlaceIdCahange(geoPlace)}
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
  )
}
export default SearchForm
