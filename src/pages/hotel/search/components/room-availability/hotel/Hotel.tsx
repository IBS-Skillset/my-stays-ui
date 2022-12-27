import React, { useRef, useState } from 'react'
import './Hotel.scss'
import SearchForm from '../../search-form/SearchForm'
import { HotelDescriptionResponse } from '../../../../../../models/hotel/description-models/hotelDescriptionResponse'
import RoomList from '../rooms/RoomList'
import Overview from '../overview/Overview'
import { HotelAvailabilityRequest } from '../../../../../../models/hotel/search-models/hotelAvailabilityRequest'
import { FaCamera } from 'react-icons/fa'

export type Props = {
  hotel: HotelDescriptionResponse
  roomAvailabilityResponse: any
  hotelAvailabilityRequest: HotelAvailabilityRequest
}
function Hotel({
  hotel,
  roomAvailabilityResponse,
  hotelAvailabilityRequest,
}: Props) {
  const [show, setShow] = useState(false)
  const types = ['Overview', 'Rooms']
  const [active, setActive] = useState('Overview')
  const overviewSection = useRef<HTMLDivElement>(null)
  const roomsSection = useRef<HTMLDivElement>(null)

  const displayImages = hotel.media.mediaUrl
    ? hotel.media.mediaUrl.slice(1, 7)
    : []

  const scrollTo = (type: string) => {
    setActive(type)
    let topSection
    if (type == 'Rooms') {
      topSection = roomsSection.current!.offsetTop
    } else {
      topSection = overviewSection.current!.offsetTop
    }
    if (topSection) {
      window.scrollTo({
        top: topSection,
        behavior: 'smooth',
      })
    }
  }
  return (
    <div className={show ? 'hide-overflow' : ''}>
      <SearchForm />
      <div className="gallery mt-2">
        {show && (
          <div className="modal-overlay">
            <div className="image-viewer" id="modal">
              <button className="close-button" onClick={() => setShow(false)}>
                &times;
              </button>
              <div className="image-grid-border">
                <div className="image-grid">
                  {hotel.media.mediaUrl.map((photo, i) => (
                    <div key={i}>
                      <img src={photo} alt="" className="image" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <img
          className="first-image"
          src={hotel.media.mediaUrl[0]}
          onClick={() => setShow(true)}
          role="presentation"
          alt=""
        />
        <div className="image-display">
          {displayImages.map((photo, i) => (
            <div key={i}>
              <img
                src={photo}
                className="hotelImg"
                onClick={() => setShow(true)}
                alt=""
                role="presentation"
              />
            </div>
          ))}
        </div>
        <div
          className="more-photos"
          onClick={() => setShow(true)}
          role="presentation"
        >
          <FaCamera className="m-1.5 h-3" />
          See more
        </div>
      </div>
      <div className="content-avail">
        <div className="button-group">
          {types.map((type) => (
            <button
              className={active === type ? 'active-tab' : 'tab'}
              key={type}
              onClick={() => scrollTo(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <div ref={overviewSection}>
          <Overview hotel={hotel} />
        </div>
        <hr className="seperator"></hr>
        <div ref={roomsSection}>
          <RoomList
            roomAvailabilityResponse={roomAvailabilityResponse}
            hotelAvailabilityRequest={hotelAvailabilityRequest}
          />
        </div>
      </div>
    </div>
  )
}
export default Hotel
