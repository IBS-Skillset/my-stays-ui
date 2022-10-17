import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosResponse } from 'axios'
import { intervalToDuration } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { Range } from 'react-date-range'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import calendarSVG from '../../../../assets/svg/calendar.svg'
import locationSVG from '../../../../assets/svg/location.svg'
import DateRangePicker from '../../../../common/datePicker/DateRangePicker'
import { HotelAvailabilityRequest } from '../../../../models/hotel/search-models/hotelAvailabilityRequest'
import { HotelAvailabilityResponse } from '../../../../models/hotel/search-models/hotelAvailabilityResponse'
import { GeoLocation } from '../../../../models/locations/geoLocation'
import { GeoPlace, GeoPlaces } from '../../../../models/locations/geoPlace'
import GeoLocationService from '../../../../services/geolocation/GeoLocationService'
import HotelSearchService from '../../../../services/hotel/HotelSearchService'
import './HotelSearch.scss'
import HotelAvailability from './search-results/HotelAvailability'

import { useSelector } from 'react-redux'
import { IRootState } from '../../../../reducers/rootReducer'
import AuthorizeUser from '../../../../setup/oauth2/components/AuthorizeUser'
import DispatchPkceData from '../../../../setup/oauth2/pkce/DispatchPkceData'
interface IFormInputs {
  location: string
}

function HotelSearch() {
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
  const [nightCount, setNightcount] = useState(0)

  const { t } = useTranslation()

  const formSchema = Yup.object().shape({
    location: Yup.string().required('*Location is required'),
  })

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFormInputs>({
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
        setHotelAvailabilityResponse(response.data)
        const days = intervalToDuration({
          start: hotelAvailabilityRequest.checkInDate,
          end: hotelAvailabilityRequest.checkOutDate,
        }).days
        typeof days != 'undefined' && setNightcount(days)
        console.log(response)
      })
      .catch((error) => {
        //Todo
        console.log(error)
        setHotelAvailabilityResponse({
          responseStatus: { status: -1 },
          hotelItem: [],
        })
      })
  }
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGeoPlaces({ ...geoPlaces, place: [] })
    setSearchTerm(event.target.value)
  }

  const handlePlaceIdCahange = (geoPlace: GeoPlace) => {
    setSearchTerm('Location: ' + geoPlace.description)
    getAndSetLocationLatLong(geoPlace.placeId)
    setGeoPlaces({ ...geoPlaces, place: [] })
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

  const readDateChange = (dateRange: Range) => {
    if (typeof dateRange === 'undefined') {
      return
    }
    if (
      typeof dateRange.startDate === 'undefined' ||
      typeof dateRange.endDate === 'undefined'
    ) {
      return
    }
    setHotelAvailabilityRequest({
      ...hotelAvailabilityRequest,
      checkInDate: dateRange.startDate,
      checkOutDate: dateRange.endDate,
    })

    console.log(hotelAvailabilityRequest)
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
      <div className="main-panel">
        <div className="front-header">
          <div className="box-container text-container h-full">
            {/* <div className="main-text">Find your next stay</div>
            <div className="text-2xl font-light text-white">
              Search low prices on hotels, homes and much more...
            </div> */}
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className="box-container search-panel">
          <form
            className="search-container w-full"
            onSubmit={handleSubmit(getHotelAvailability)}
          >
            <div className="col-span-2 outline outline-none h-full">
              <div className="flex justify-around h-full">
                <div className="h-full content-center justify-center py-2">
                  <img src={locationSVG} alt="" className="svg-image" />
                </div>
                <input
                  value={searchTerm}
                  className="h-full w-full outline-none pl-3"
                  placeholder={t('HOTEL_SEARCH.BUTTON.SEARCH')}
                  type="text"
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
                          onClickCapture={() => handlePlaceIdCahange(geoPlace)}
                          id={geoPlace.placeId}
                          key={geoPlace.placeId}
                        >
                          {geoPlace.description}
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
            <div className="h-full w-full flex flex-row">
              <DateRangePicker
                handleDateChange={readDateChange}
              ></DateRangePicker>
              <div className="calenderIcon py-2">
                <img src={calendarSVG} alt="" className="svg-image" />
              </div>
            </div>
            <div className="h-full search-action">
              <button className="search-button">
                {t('HOTEL_SEARCH.BUTTON.SEARCH')}
              </button>
            </div>
          </form>
        </div>
        <div className="box-container mt-2">
          {errors.location && errors.location?.message && (
            <span className="errorMsg">{errors.location.message}</span>
          )}
        </div>
        {typeof hotelAvailabilityResponse != 'undefined' &&
        typeof hotelAvailabilityResponse.hotelItem != 'undefined' &&
        hotelAvailabilityResponse.hotelItem.length > 0 ? (
          <HotelAvailability
            hotelAvailabilityResponse={hotelAvailabilityResponse}
            hotelAvailabilityRequest = {hotelAvailabilityRequest}
            days={nightCount}
          ></HotelAvailability>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default HotelSearch
