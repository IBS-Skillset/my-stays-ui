import React, { useState } from 'react'
import './Hotel.scss'
import ModalPopup from './RoomList'
import map from '../../../../../assets/images/map.jpg'
import SearchForm from '../search-form/SearchForm'
import { HotelDescriptionResponse } from '../../../../../models/hotel/description-models/hotelDescriptionResponse'

export type Props = {
  hotel: HotelDescriptionResponse
  roomAvailabilityResponse: any
}
function Hotel({ hotel, roomAvailabilityResponse }: Props) {
  const [show, setShow] = useState(false)
  const types = ['Overview', 'Rooms']
  const [active, setActive] = useState('Overview')

  const displayImages = hotel.media.mediaUrl
    ? hotel.media.mediaUrl.slice(0, 6)
    : []
  const numberOfImages = hotel.media.mediaUrl.length - 6

  return (
    <div className="main-content">
      <SearchForm />
      <div className="gallery mt-2">
        {show && (
          <div className="image-viewer">
            <button className="close-button" onClick={() => setShow(false)}>
              &times;
            </button>
            <div className="image-grid">
              {hotel.media.mediaUrl.map((photo, i) => (
                <div key={i}>
                  <img src={photo} alt="" className="image" />
                </div>
              ))}
            </div>
          </div>
        )}
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
        <div className="more-photos">+{numberOfImages} photos</div>
      </div>
      <div className="content-avail">
        <div className="button-group">
          {types.map((type) => (
            <button
              className={active === type ? 'active-tab' : 'tab'}
              key={type}
              onClick={() => setActive(type)}
            >
              {type}
            </button>
          ))}
        </div>
        {active == 'Overview' && (
          <div className="overview">
            <div className="address-avail">
              <h1 className="hotelName">Crown Plaza</h1>
              <div className="address-field">
                <h1 className="adress">
                  {hotel.hotelItem.address.countryName}
                </h1>
                ,
                <h1 className="adress">
                  {hotel.hotelItem.address.streetAddress}
                </h1>
                ,<h1 className="adress">{hotel.hotelItem.address.zipCode}</h1>
              </div>
            </div>
            <img src={map} alt="" className="map" />
          </div>
        )}
        {active == 'Rooms' && (
          <ModalPopup
            hotel={hotel}
            roomAvailabilityResponse={roomAvailabilityResponse}
          />
        )}
      </div>
    </div>
  )
}
export default Hotel
