import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HotelOverview from './hotel-overview/HotelOverview'
import RateDetails from './rate-details/RateDetails'
import './BookConfirmation.scss'
import UserDetails from './user-details/UserDetails'
import { HotelRepriceResponse } from '../../../../models/hotel/reprice-models/hotelRepriceResponse'
import lockIcon from '../../../../assets/images/lockIcon.jpg'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
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
import {
  getHotelAvailabilityRequest,
  getHotelDescriptionResponses,
  getInitialRoomPrice,
  getNightlyPrice,
  getRepriceResponse,
  getUserDetails,
} from '../../../../store/selectors/Selectors'
import { HotelDescriptionResponse } from '../../../../models/hotel/description-models/hotelDescriptionResponse'
import CommonConstants from '../../../../constants/CommonConstants'

const BookConfirmation = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const repriceResponse: HotelRepriceResponse = useSelector(getRepriceResponse)

  const initialRoomPrice: number = useSelector(getInitialRoomPrice)

  const nightlyPrice: number = useSelector(getNightlyPrice)

  const hotelAvailabilityRequest: HotelAvailabilityRequest = useSelector(
    getHotelAvailabilityRequest,
  )

  const hotel: HotelDescriptionResponse = useSelector(
    getHotelDescriptionResponses,
  )[repriceResponse.hotelCode]

  const hotelPhoneNumber: string = hotel.hotelItem.address.phoneNumber

  const userDetails = useSelector(getUserDetails)

  const schema = Yup.object().shape({
    cvv: Yup.string()
      .required(CommonConstants.CVC_REQUIRED)
      .min(3, CommonConstants.CVC_LEAST)
      .max(4, CommonConstants.CVC_MOST)
      .matches(/[0-9]/, CommonConstants.INVALID_CVC),
    cardNumber: Yup.string()
      .required(CommonConstants.CARD_NUMBER_REQUIRED)
      .test(
        CommonConstants.TEST_NUMBER,
        CommonConstants.INVALID_CARD_NUMBER,
        (value) => valid.number(value).isValid,
      ),
    expiryDate: Yup.string()
      .required(CommonConstants.EXPIRY_DATE_REQUIRED)
      .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, CommonConstants.INVALID_EXPIRY_DATE),
    cardHolderName: Yup.string().required(CommonConstants.CARDHOLDER_NAME_REQUIRED),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentInfo>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  })

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
      <form
        aria-label="book-confirm"
        className="form-book"
        onSubmit={handleSubmit(formSubmitHandler)}
      >
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
