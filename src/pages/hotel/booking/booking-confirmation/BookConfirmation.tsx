import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../../store/reducers/rootReducer'
import HotelOverview from './hotel-overview/HotelOverview'
import RateDetails from './rate-details/RateDetails'
import './BookConfirmation.scss'
import UserDetails from './user-details/UserDetails'
import { HotelRepriceResponse } from '../../../../models/hotel/reprice-models/hotelRepriceResponse'
import lockIcon from '../../../../assets/images/lockIcon.jpg'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as Yup from 'yup'
import valid from 'card-validator'
import PaymentDetails from './payment-details/PaymentDetails'
import { HotelAvailabilityRequest } from '../../../../models/hotel/search-models/hotelAvailabilityRequest'
import { PaymentInfo } from '../../../../models/hotel/book-models/bookRequest'
import BookService from '../../../../services/hotel/BookService'
import { AxiosResponse } from 'axios'
import { BookResponse } from '../../../../models/hotel/book-models/bookResponse'
import { bookResponseAction } from '../../../../store/actions/bookAction'
import { useNavigate } from 'react-router-dom'
import PriceChangeAlert from './reprice-alert/PriceChangeAlert'
import { getRateTolerance } from '../../../common/utils/CommonUtils'

const BookConfirmation = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const repriceResponse: HotelRepriceResponse = useSelector(
    (state: IRootState) => state.hotel.rate.rate,
  )

  const initialRoomPrice: number = useSelector(
    (state: IRootState) => state.hotel.rate.initialRoomPrice,
  )

  const nightlyPrice: number = useSelector(
    (state: IRootState) => state.hotel.rate.nightlyPrice,
  )

  const hotelAvailabilityRequest: HotelAvailabilityRequest = useSelector(
    (state: IRootState) =>
      state.hotel.availabilityRequest.hotelAvailabilityRequest,
  )

  const hotelPhoneNumber: string = useSelector((state: IRootState) => {
    return state.hotel.descriptionResponse.hotelDescriptionResponsesPerCode[
      repriceResponse.hotelCode
    ].hotelItem.address.phoneNumber
  })

  const schema = Yup.object().shape({
    cvv: Yup.string()
      .required('CVC is required')
      .min(3, 'CVC must be at least 3 characters')
      .max(4, 'CVC must be at most 4 characters')
      .matches(/[0-9]/, 'Invalid CVC'),
    cardNumber: Yup.string()
      .required('Card number is required')
      .test(
        'test-number',
        'Invalid card number',
        (value) => valid.number(value).isValid,
      ),
    expiryDate: Yup.string()
      .required('Expiry date is required')
      .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Invalid expiry date'),
    cardHolderName: Yup.string().required('Card holder name is required'),
  })

  const hotel = useSelector((state: IRootState) => {
    return state.hotel.descriptionResponse.hotelDescriptionResponsesPerCode[
      repriceResponse.hotelCode
    ]
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentInfo>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  })
  const userDetails = useSelector(
    (state: IRootState) => state.userDetails.userDetails,
  )

  const formSubmitHandler: SubmitHandler<PaymentInfo> = (data: PaymentInfo) => {
    BookService.getBookResponse(
      data,
      userDetails,
      repriceResponse,
      hotelAvailabilityRequest,
      hotelPhoneNumber,
      nightlyPrice,
    )
      .then((response: AxiosResponse<BookResponse>) => {
        console.log('book response : ', response.data)
        dispatch(bookResponseAction(response.data))
        navigate('/finalConfirmation')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <form className="form-book" onSubmit={handleSubmit(formSubmitHandler)}>
        {getRateTolerance(initialRoomPrice, repriceResponse.amount) >= 5 && (
          <PriceChangeAlert />
        )}
        <div className="content-book">
          <RateDetails
            hotelRepriceResponse={repriceResponse}
            hotelAvailabilityRequest={hotelAvailabilityRequest}
          />
          <div className="other-book-details">
            <HotelOverview hotel={hotel} />
            <UserDetails />
            <PaymentDetails errors={errors} register={register} />
          </div>
        </div>
        <button className="book-now-button">
          <img src={lockIcon} className="lock-icon" alt="" />
          <h1 className="book">BOOK NOW!</h1>
        </button>
      </form>
    </>
  )
}

export default BookConfirmation
