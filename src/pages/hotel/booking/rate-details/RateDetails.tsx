import React from 'react'
import './RateDetails.scss'
import { useSelector } from 'react-redux'
import { IRootState } from '../../../../store/reducers/rootReducer'

function RateDetails() {
  const days: number = useSelector(
    (state: IRootState) => state.hotel.nightCount.days,
  )

  return (
    // later rate details needs to be taken from raterule

    <div className="side-content">
      <div className="booking-details border">
        <div className="booking-content">
          <h2 className="confirmation-heading book-date">
            Your booking details
          </h2>
          <div className="dates policy">
            <div className="input-dates final-rate">
              Check-in
              <p className="book-date">Sun 4 Dec 2022</p>
            </div>
            <div className="divider"></div>
            <div className="input-dates final-rate">
              Check-out
              <p className="book-date">Wed 7 Dec 2022</p>
            </div>
          </div>
          <div className="mid-layer">
            <h3 className="stay room-font">Total length of stay :</h3>
            <p className="nights-count final-rate book-date"> {days} Nights</p>
          </div>
          <div className="divider"></div>
          <div className="bottom-layer">
            <h2 className="selection nights-count">You Selected:</h2>
            <p>Classic Room</p>
          </div>
        </div>
      </div>
      <div className="rate border">
        <div className="rate-content">
          <h2 className="rate-heading confirmation-heading book-date">
            Your price summary
          </h2>
          <div className="room-price policy">
            <p className="room room-font">Room price</p>
            <p className="room-rate room-font">13,500</p>
          </div>
          <div className="divider"></div>
          <div className="room-price policy">
            <h2 className="room-heading stay room-font">Price</h2>

            <h2 className="rate-final stay room-font">14,000</h2>
          </div>
        </div>
      </div>
      <div className="cancel border rate">
        <div className="cancel-content">
          <h2 className="cancel-heading confirmation-heading book-date">
            {' '}
            How much it will cost to cancel?
          </h2>
          <div className="cancel-date">
            <p className="cancellation final-rate">
              Free cancellation until 23:59 on 28 Dec
            </p>
            <div className="policy">
              <p className="rate-cancel final-rate">From 00:00 on 29 Nov</p>
              <p className="final-rate">16000*</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default RateDetails
