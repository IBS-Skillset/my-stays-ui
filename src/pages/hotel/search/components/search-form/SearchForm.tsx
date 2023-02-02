import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosResponse } from 'axios'
import { intervalToDuration } from 'date-fns'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { HotelAvailabilityRequest } from '../../../../../models/hotel/search-models/hotelAvailabilityRequest'
import { HotelAvailabilityResponse } from '../../../../../models/hotel/search-models/hotelAvailabilityResponse'
import HotelSearchService from '../../../../../services/hotel/HotelSearchService'
import {
  hotelSearchAvailabilityRequestAction,
  hotelSearchAvailabilityResponseAction,
  nightCountAction,
} from '../../../../../store/actions/hotelSearchAction'
import {
  getHotelAvailabilityRequest,
  getLocationState,
} from '../../../../../store/selectors/Selectors'
import DateRange from '../../../../common/components/date-range/DateRange'
import Location from '../../../../common/components/location/Location'
import Travelers from '../../../../common/components/travelers/Travelers'
import './SearchForm.css'
import CommonConstants from '../../../../../constants/CommonConstants'

interface IFormInputs {
  location: string
}

function SearchForm() {
  const [searchTerm, setSearchTerm] = useState('')
  const [hotelAvailabilityRequest, setHotelAvailabilityRequest] =
    useState<HotelAvailabilityRequest>({
      latitude: '',
      longitude: '',
      checkInDate: new Date(),
      checkOutDate: new Date(),
    })
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(
    new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + 1,
    ),
  )
  const dispatch = useDispatch()

  const formSchema = Yup.object().shape({
    location: Yup.string().required(CommonConstants.LOCATION_REQUIRED),
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

  const locationState: string = useSelector(getLocationState)

  const hotelAvailabilityRequestState: HotelAvailabilityRequest = useSelector(
    getHotelAvailabilityRequest,
  )

  useEffect(() => {
    setSearchTerm(locationState)
    setStartDate(hotelAvailabilityRequestState.checkInDate)
    setEndDate(hotelAvailabilityRequestState.checkOutDate)
  }, [hotelAvailabilityRequestState])

  const getHotelAvailability: SubmitHandler<IFormInputs> = () => {
    if (
      hotelAvailabilityRequest.latitude === '' ||
      hotelAvailabilityRequest.longitude === ''
    ) {
      setSearchTerm('')
      setError('location', {
        type: 'manual',
        message: CommonConstants.SEARCH_LOCATION,
      })
      return
    }
    if (startDate == endDate || startDate > endDate) {
      setError('location', {
        type: 'manual',
        message: CommonConstants.INCORRECT_DATE_RANGE,
      })
      return
    }
    HotelSearchService.getHotelAvailabilitySearch(hotelAvailabilityRequest)
      .then((response: AxiosResponse<HotelAvailabilityResponse>) => {
        dispatch(hotelSearchAvailabilityRequestAction(hotelAvailabilityRequest))
        dispatch(hotelSearchAvailabilityResponseAction(response.data))
        if (response.data.responseStatus.errorMessage == CommonConstants.NO_AVAILABILITY) {
          setError('location', {
            type: 'manual',
            message: CommonConstants.NO_AVAILABLE_HOTELS,
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
        }
      })
      .catch((error) => {
        console.log(error)
        dispatch(
          hotelSearchAvailabilityResponseAction({
            responseStatus: {
              status: -1,
              errorMessage: CommonConstants.INTERNAL_SERVER,
              errorCode: '999',
            },
            hotelItem: [],
          }),
        )
      })
  }

  return (
    <div className="mt-2">
      <form
        aria-label="search-form"
        className="search-container"
        onSubmit={handleSubmit(getHotelAvailability)}
      >
        {errors.location && <p>{errors.location.message}</p>}
        <Location
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          hotelAvailabilityRequest={hotelAvailabilityRequest}
          setHotelAvailabilityRequest={setHotelAvailabilityRequest}
          register={register}
        />
        <div className="search-inputs-container">
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
        <div className="hotel-search-button">
          <button className="button">Search</button>
        </div>
      </form>
    </div>
  )
}
export default SearchForm
