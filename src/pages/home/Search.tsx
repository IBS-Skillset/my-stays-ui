import './Search.scss'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { AxiosResponse } from 'axios'
import { HotelAvailabilityRequest } from '../../models/hotel/search-models/hotelAvailabilityRequest'
import HotelSearchService from '../../services/hotel/HotelSearchService'
import { HotelAvailabilityResponse } from '../../models/hotel/search-models/hotelAvailabilityResponse'
import { intervalToDuration } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import DispatchPkceData from '../../setup/oauth2/pkce/DispatchPkceData'
import AuthorizeUser from '../../setup/oauth2/components/AuthorizeUser'
import {
  hotelSearchAvailabilityRequestAction,
  hotelSearchAvailabilityResponseAction,
  nightCountAction,
} from '../../store/actions/hotelSearchAction'
import { useNavigate } from 'react-router-dom'
import { SearchHeader } from './search-header/SearchHeader'
import Location from '../common/components/location/Location'
import DateRange from '../common/components/date-range/DateRange'
import Travelers from '../common/components/travelers/Travelers'
import { fetchUserDetails } from '../../store/actions/userDetailsAction'
import UserDetailsService from '../../services/user/UserDetailsService'
import {
  getAccessToken,
  getEmail,
  getIsAuthorized,
} from '../../store/selectors/Selectors'

interface IFormInputs {
  location: string
}

function Search() {
  const [searchTerm, setSearchTerm] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const date = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate() + 1,
  )
  const [endDate, setEndDate] = useState(date)
  const [hotelAvailabilityRequest, setHotelAvailabilityRequest] =
    useState<HotelAvailabilityRequest>({
      latitude: '',
      longitude: '',
      checkInDate: new Date(),
      checkOutDate: date,
    })

  const formSchema = Yup.object().shape({
    location: Yup.string().required('*Location is required'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormInputs>({
    resolver: yupResolver(formSchema),
    mode: 'onSubmit',
  })

  const accessToken = useSelector(getAccessToken)
  const isAuthorized = useSelector(getIsAuthorized)
  const isemail = useSelector(getEmail)

  useEffect(() => {
    UserDetailsService.getUserDetails(isemail)
      .then((response) => {
        if (response.data.email === isemail) {
          dispatch(fetchUserDetails(response.data))
        } else {
          alert('user not found')
        }
      })
      .catch((error) => {
        console.log(error)
        navigate('/signin')
      })
  }, [accessToken, isemail])
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
    HotelSearchService.getHotelAvailabilitySearch(hotelAvailabilityRequest)
      .then((response: AxiosResponse<HotelAvailabilityResponse>) => {
        dispatch(hotelSearchAvailabilityRequestAction(hotelAvailabilityRequest))
        dispatch(hotelSearchAvailabilityResponseAction(response.data))
        if (response.data.responseStatus.errorMessage == 'No Availability') {
          setError('location', {
            type: 'manual',
            message:
              'No available hotels matching your request were found. Please amend your search criteria.',
          })
        } else {
          const days = intervalToDuration({
            start: new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
              startDate.getDay(),
            ),
            end: new Date(
              endDate.getFullYear(),
              endDate.getMonth(),
              endDate.getDay(),
            ),
          }).days
          typeof days != 'undefined' && dispatch(nightCountAction(days))
          console.log(response)
          navigate('/search')
        }
      })
      .catch((error) => {
        console.log(error)
        dispatch(
          hotelSearchAvailabilityResponseAction({
            responseStatus: {
              status: -1,
              errorMessage: 'Internal server error',
              errorCode: '999',
            },
            hotelItem: [],
          }),
        )
      })
  }

  const travelWrapStyle = {
    marginLeft: '0px',
    marginBottom: '100px',
  }

  return (
    <div className="main">
      <form
        className="inner-form"
        aria-label="Search Hotels"
        name="SearchForm"
        onSubmit={handleSubmit(getHotelAvailability)}
      >
        <div className="heading">Search Hotels</div>
        <SearchHeader travelWrapStyle={travelWrapStyle} />
        <div className="main-form">
          {errors.location && (
            <div className="error-text">{errors.location.message}</div>
          )}
          <Location
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            hotelAvailabilityRequest={hotelAvailabilityRequest}
            setHotelAvailabilityRequest={setHotelAvailabilityRequest}
            register={register}
          />
          <div className="box-border flex h-16 mb-2 p-5">
            <DateRange
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              hotelAvailabilityRequest={hotelAvailabilityRequest}
              setHotelAvailabilityRequest={setHotelAvailabilityRequest}
            />
            <Travelers />
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
