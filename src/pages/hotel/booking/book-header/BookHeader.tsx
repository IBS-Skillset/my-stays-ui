import React from 'react'
import { ImCheckmark } from 'react-icons/im'
import { useLocation } from 'react-router'
import './BookHeader.scss'
import { BookResponse } from '../../../../models/hotel/book-models/bookResponse'
import { useSelector } from 'react-redux'
import { IRootState } from '../../../../store/reducers/rootReducer'

function BookHeader() {
  const bookResponse: BookResponse = useSelector(
    (state: IRootState) => state.hotel.bookResponse.bookResponse,
  )

  const isSuccessBook =
    useLocation().pathname == '/finalConfirmation' &&
    bookResponse.responseStatus.status == 1
      ? 'booking-confirm-after-book'
      : ''

  return (
    <div className="book-header-container">
      <div className="book-items display-content">
        <div className="items">
          <div className="book-indicator progress-divider">1</div>
          <div className="title display-content">Customer Information</div>
        </div>
        <div className="progress-divider border-divider"></div>
        <div className="items">
          <div className="book-indicator progress-divider">2</div>
          <div className="title display-content">Payment Information</div>
        </div>
        <div
          className={'progress-divider-final border-divider ' + isSuccessBook}
        ></div>
        <div className="items-icon">
          <div
            className={'book-indicator-icon display-content ' + isSuccessBook}
          >
            <ImCheckmark />
          </div>
          <div className={'title-nonactive display-content ' + isSuccessBook}>
            Booking is confirmed
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookHeader
