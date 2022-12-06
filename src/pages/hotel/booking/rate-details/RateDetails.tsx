import React from 'react'
import './RateDetails.scss'
import { useSelector } from 'react-redux'
import { IRootState } from '../../../../store/reducers/rootReducer'
import { HotelRepriceResponse } from '../../../../models/hotel/reprice-models/hotelRepriceResponse'
import { HotelAvailabilityRequest } from '../../../../models/hotel/search-models/hotelAvailabilityRequest'

type Props = {
  hotelRepriceResponse: HotelRepriceResponse
  hotelAvailabilityRequest: HotelAvailabilityRequest
}

const RateDetails = ({
  hotelRepriceResponse,
  hotelAvailabilityRequest,
}: Props) => {
  const days: number = useSelector(
    (state: IRootState) => state.hotel.nightCount.days,
  )

  const text = hotelRepriceResponse.penaltyDescriptionText.replaceAll(
    ' (local time)',
    '',
  )
  const limit = text.split('fees')

  return (
    <div className="side-content">
      <div className="booking-details details-border">
        <div className="booking-content">
          <h2 className="confirmation-heading book-date">
            Your booking details
          </h2>
          <div className="dates policy">
            <div className="input-dates final-rate">
              Check-in
              <p className="book-date">
                {hotelAvailabilityRequest.checkInDate.toDateString()}
              </p>
            </div>
            <div className="divider"></div>
            <div className="input-dates final-rate">
              Check-out
              <p className="book-date">
                {hotelAvailabilityRequest.checkOutDate.toDateString()}
              </p>
            </div>
          </div>
          <div className="mid-layer">
            <h3 className="stay room-font">Total length of stay :</h3>
            <p className="nights-count final-rate book-date"> {days} Nights</p>
          </div>
        </div>
      </div>
      <div className="rate details-border">
        <div className="rate-content">
          <h2 className="rate-heading confirmation-heading book-date">
            Your price summary
          </h2>
          <div className="room-price policy">
            <h2 className="room-heading stay room-font">Price</h2>
            <h2 className="rate-final stay room-font">
              €{hotelRepriceResponse.amount}
            </h2>
          </div>
        </div>
      </div>
      <div className="details-border rate">
        <div className="cancel-content">
          <h2 className="cancel-heading confirmation-heading book-date">
            {' '}
            How much it will cost to cancel?
          </h2>
          <div className="cancel-date">
            <p className="cancellation final-rate">{limit[0]} fee</p>
            <div className="policy">
              <p className="rate-cancel final-rate">
                {limit[1].replace('EUR', ' €')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default RateDetails
