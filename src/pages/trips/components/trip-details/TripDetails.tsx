import hotelsSVG from '../../../../assets/images/hotels.png'
import './TripDetails.scss'
import React from 'react'
import room from '../../../../assets/images/room-icon.png'
import { Link } from 'react-router-dom'
import { Trip } from '../../../../models/trips/myTripsResponse'
import {
  getCurrencySymbol,
  getDate,
  getDateConversion,
  getDayConversion,
  getDays,
} from '../../../common/utils/CommonUtils'

type Props = {
  trip: Trip
  isCompleted: boolean
}
const TripDetails = ({ trip, isCompleted }: Props) => {
  return (
    <>
      <div className="booking-info-container">
        <img className="hotels-img" src={hotelsSVG} alt="" />
        <div className="booking-info">
          <h1 className="hotelName pb-2">{trip.hotelName}</h1>
          <h1 className="text-gray-500">Booking ID - {trip.bookingId}</h1>
          <h4 className="text-xs font-semibold pb-1.5">
            Created on {getDate(trip.bookingDate)}
          </h4>
        </div>
      </div>
      <div className="booking-details-container">
        <div className="booking-details">
          <table className="trips-table">
            <thead>
              <tr>
                <th className="trips-table-header">CHECK-IN</th>
                <th className="trips-table-header">CHECK-OUT</th>
                <th></th>
                <th className="trips-table-header">Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr className="font-bold">
                <td>{getDateConversion(trip.checkInDate).toDateString()}</td>
                <td>{getDateConversion(trip.checkOutDate).toDateString()}</td>
                <td className="text-blue-500 flex">
                  <img src={room} alt="" /> 1 Room(s),{' '}
                  {getDays(trip.checkInDate, trip.checkOutDate)} Night(s)
                </td>
                <td>
                  {getCurrencySymbol(trip.currencyCode) + ' ' + trip.totalPrice}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="pt-6 pb-2 flex justify-between">
            <h1 className="text-green-600 text-sm">
              {trip.freeCancellationUntil &&
                'Free Cancellation until 23:59 on ' +
                  getDayConversion(trip.freeCancellationUntil)}
            </h1>
            {/* TODO: View this booking and Cancel implementation */}
            <div className="text-sm text-blue-700 flex font-bold px-px">
              <Link className="pr-1.5 cursor-not-allowed" to="">
                View this booking
              </Link>
              {!isCompleted && (
                <div>
                  |
                  <Link className="pl-1.5 cursor-not-allowed" to="">
                    Cancel
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TripDetails
