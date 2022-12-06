import infoSVG from '../../../../../src/assets/svg/info.svg'
import { FaHotel } from 'react-icons/fa'
import { useEffect } from 'react'
import './FinalConfirmation.scss'
import { useSelector } from 'react-redux'
import { IRootState } from '../../../../store/reducers/rootReducer'

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

  return (
    <>
      <div>
        <div className="final-booking-confirmation-panel">
          <div className="final-booking-info-outline">
            <div className="final-booking-info-image-container">
              <img src={infoSVG} alt="" className="info-image" />
            </div>
            <div className="final-booking-info-content">
              {/* The success or error message should be replaced here based on the booking status */}
              Your trip has been successfully booked . Thank you for your
              reservation.
            </div>
          </div>
        </div>
        <div className="final-booking-content">
          <div className="final-booking-details-container">
            <div className="final-booking-details">
              <div id="final-booking-content">
                <FaHotel className="final-booking-hotel-room-image" />
              </div>
              <div className="final-booking-hotel-name">
                <h1> Holiday Inn Express London Victoria</h1>
                <div className="flex font-normal">
                  <div className="font-medium text-base mt-0.5">Booked</div>
                  <div className="final-booking-id">
                    Booking ID - NHDESDDSDSDS73
                  </div>
                </div>
              </div>
              <div className="view-booking">
                <button className="btn-viewbooking">VIEW BOOKING</button>
              </div>
            </div>
          </div>
          <div className="final-booking-hotel-details-container">
            <div className="mt-10 ml-28 space-x-40 flex text-gray-500 text-xl">
              <h1>CHECK-IN</h1>
              <h2>CHECK-OUT</h2>
            </div>
            <div className="ml-28 flex font-bold text-xl">
              <div>29Mar&apos;22 Wed</div>
              <div className="ml-28">31Mar&apos;22 Fri</div>
              <div className="ml-28">
                <FaHotel className="icon" />
              </div>
              <div className="ml-2 text-sky-500 font-medium text-lg">
                1 Room(s), {days} Night(s)
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FinalConfirmation
