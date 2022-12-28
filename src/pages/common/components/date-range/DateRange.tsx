import calendarSVG from '../../../../assets/svg/calendar.svg'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import React, { Dispatch } from 'react'
import { HotelAvailabilityRequest } from '../../../../models/hotel/search-models/hotelAvailabilityRequest'

type Props = {
  startDate: Date | null | undefined
  endDate: Date | null | undefined
  setStartDate: Dispatch<Date>
  setEndDate: Dispatch<Date>
  hotelAvailabilityRequest: HotelAvailabilityRequest
  setHotelAvailabilityRequest: Dispatch<HotelAvailabilityRequest>
}
const DateRange = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  hotelAvailabilityRequest,
  setHotelAvailabilityRequest,
}: Props) => {
  const handleStartdate = (date: Date) => {
    const nextDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1,
    )
    setStartDate(date)
    setEndDate(nextDate)
    setHotelAvailabilityRequest({
      ...hotelAvailabilityRequest,
      checkInDate: date,
      checkOutDate: nextDate,
    })
  }
  const handleEnddate = (date: Date) => {
    setEndDate(date)
    setHotelAvailabilityRequest({
      ...hotelAvailabilityRequest,
      checkOutDate: date,
    })
  }

  return (
    <>
      <div className="date-container check-in">
        <div className="date-image-container">
          <img src={calendarSVG} alt="" className="date-image" />
        </div>
        <div className="date-input-container">
          <div className="date-label">CHECK IN</div>
          <div className="date-input">
            <DatePicker
              className="date-picker"
              placeholderText="mm/dd/yyyy"
              selected={startDate}
              selectsStart
              onChange={handleStartdate}
            />
          </div>
        </div>
      </div>
      <div className="date-container check-out">
        <div className="date-image-container">
          <img src={calendarSVG} alt="" className="date-image" />
        </div>
        <div className="date-input-container">
          <div className="date-label">CHECK OUT</div>
          <div className="date-input">
            <DatePicker
              className="date-picker"
              placeholderText="mm/dd/yyyy"
              selected={endDate}
              selectsEnd
              onChange={handleEnddate}
              minDate={startDate}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default DateRange
