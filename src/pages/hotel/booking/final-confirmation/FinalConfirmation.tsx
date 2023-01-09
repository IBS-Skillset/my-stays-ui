import infoSVG from '../../../../../src/assets/svg/info.svg'
import errorInfo from '../../../../../src/assets/images/failureInfo.jpg'
import { FaHotel } from 'react-icons/fa'
import React, { useEffect } from 'react'
import './FinalConfirmation.scss'
import { useSelector } from 'react-redux'
import { IRootState } from '../../../../store/reducers/rootReducer'
import { BookResponse } from '../../../../models/hotel/book-models/bookResponse'
import { Link } from 'react-router-dom'

const FinalConfirmation = () => {
  useEffect(() => {
    window.history.pushState(null, '', window.location.href)
    window.addEventListener('popstate', () => {
      window.history.forward()
    })
  }, [])

  const days: number = useSelector(
    (state: IRootState) => state.hotel.nightCount.days,
  )

  const bookResponse: BookResponse = useSelector(
    (state: IRootState) => state.hotel.bookResponse.bookResponse,
  )

  function displayMessage() {
    let message = ''
    if (bookResponse.responseStatus.status == 0) {
      message =
        'Your booking has failed. Please try again. ' +
        bookResponse.responseStatus.errorMessage
    } else if (bookResponse.responseStatus.status == 1) {
      message =
        'Your trip has been successfully booked . Thank you for your\n' +
        '            reservation.'
    }
    return message
  }

  return (
    <>
      <div className="final-confirmation">
        <div className="final-booking-info-outline">
          <div className="final-booking-info-image-container">
            {bookResponse.responseStatus.status == 1 && (
              <img src={infoSVG} alt="" />
            )}
            {bookResponse.responseStatus.status == 0 && (
              <img src={errorInfo} alt="" className="error-info" />
            )}
          </div>
          <h1 className="final-booking-info-content">{displayMessage()}</h1>
        </div>
        {bookResponse.responseStatus.status == 1 && (
          <div className="final-booking-content">
            <div className="final-booking-details-container">
              <div className="final-booking-details">
                <div id="final-booking-content">
                  <FaHotel className="final-booking-hotel-room-image" />
                </div>
                <div className="final-booking-hotel-name">
                  <h1>{bookResponse.hotelName}</h1>
                  <div className="flex font-normal">
                    <div className="font-medium text-base mt-1">Booked</div>
                    <div className="final-booking-id mt-1">
                      Booking ID -{' '}
                      <h1 className="confirmation-number">
                        &nbsp;
                        {bookResponse.pnrInfo.confirmationNumber}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="view-booking">
                  <Link to={'/mytrips'}>
                    <button className="btn-viewbooking">VIEW BOOKING</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="final-booking-hotel-details-container">
              <div className="mt-10 space-x-40 flex text-gray-500 text-sm ml-20">
                <h1>CHECK-IN</h1>
                <h2>CHECK-OUT</h2>
              </div>
              <div className="flex font-bold text-base">
                <div className="ml-20">
                  {new Date(bookResponse.startDate).toDateString()}
                </div>
                <div className="check-out-date">
                  {new Date(bookResponse.endDate).toDateString()}
                </div>
                <div className="ml-28">
                  <FaHotel className="icon" />
                </div>
                <div className="ml-2 text-sky-500 font-medium text-lg">
                  1 Room(s), {days} Night(s)
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default FinalConfirmation
