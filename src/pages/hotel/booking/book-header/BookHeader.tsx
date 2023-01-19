import { ImCheckmark } from 'react-icons/im'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { BookResponse } from '../../../../models/hotel/book-models/bookResponse'
import { getBookResponse } from '../../../../store/selectors/Selectors'
import './BookHeader.scss'

function BookHeader() {
  const bookResponse: BookResponse = useSelector(getBookResponse)

  const finalConfirmationMatch =
    useLocation().pathname == '/finalConfirmation' &&
    bookResponse.responseStatus.status == 1

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
          className={
            'progress-divider-final border-divider ' +
            (finalConfirmationMatch ? 'progress-divider-after-book' : '')
          }
        ></div>
        <div className="items-icon">
          <div
            className={
              'book-indicator-icon display-content ' +
              (finalConfirmationMatch ? 'items-icon-after-book' : '')
            }
          >
            <ImCheckmark />
          </div>
          <div
            className={
              'title-nonactive display-content ' +
              (finalConfirmationMatch ? 'booking-confirm-after-book' : '')
            }
          >
            Booking is confirmed
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookHeader
