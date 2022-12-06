import React from 'react'
import { useSelector } from 'react-redux'
import { IRootState } from '../../../store/reducers/rootReducer'
import HotelOverview from './hotel-overview/HotelOverview'
import RateDetails from './rate-details/RateDetails'
import './BookConfirmation.scss'

const BookConfirmation = () => {
  const hotel = useSelector((state: IRootState) => {
    return state.hotel.descriptionResponse.hotelDescriptionResponsesPerCode[
      '114473' //hotelCode needs to be taken from raterule
    ]
  })

  return (
    <>
      <div className="content-book">
        <RateDetails />
        <HotelOverview hotel={hotel} />
      </div>
    </>
  )
}

export default BookConfirmation
