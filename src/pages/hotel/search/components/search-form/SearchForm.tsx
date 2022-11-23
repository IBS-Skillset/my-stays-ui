import React, { useEffect, useState } from 'react'
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
  nightCountAction,
} from '../../../../../store/actions/hotelSearchAction'
import { intervalToDuration } from 'date-fns'
import './SearchForm.css'
import { IRootState } from '../../../../../store/reducers/rootReducer'
import Location from '../../../../common/components/location/Location'
import DateRange from '../../../../common/components/date-range/DateRange'
import Travelers from '../../../../common/components/travelers/Travelers'

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

  return (
    <div className="mt-2">
      <form
        className="search-container"
        onSubmit={handleSubmit(getHotelAvailability)}
      >
        <Location
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          hotelAvailabilityRequest={hotelAvailabilityRequest}
          setHotelAvailabilityRequest={setHotelAvailabilityRequest}
          register={register}
        />
        <DateRange
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          hotelAvailabilityRequest={hotelAvailabilityRequest}
          setHotelAvailabilityRequest={setHotelAvailabilityRequest}
        />
        <Travelers />
        <button className="button">Search</button>
      </form>
    </div>
  )
}
export default SearchForm
