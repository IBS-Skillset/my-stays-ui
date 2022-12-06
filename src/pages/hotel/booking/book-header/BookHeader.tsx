import React from 'react'
import { ImCheckmark } from 'react-icons/im'
import './BookHeader.scss'

function BookHeader() {
  return (
    <div className="book-header-container">
      <div className="book-items display-content">
        <div className="items">
          <div className="book-indicator progress-divider initial-indicator">
            1
          </div>
          <div className="title initial-content">Customer Information</div>
        </div>
        <div className="progress-divider border-divider"></div>
        <div className="items">
          <div className="book-indicator progress-divider">2</div>
          <div className="title display-content">Payment Information</div>
        </div>
        <div className="progress-divider-final border-divider"></div>
        <div className="items-icon">
          <div className="book-indicator-icon display-content progress-divider-final">
            <ImCheckmark />
          </div>
          <div className="title-nonactive display-content">
            Booking is confirmed
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookHeader
