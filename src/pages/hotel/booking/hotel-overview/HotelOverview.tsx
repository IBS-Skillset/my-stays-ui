import React from 'react'
import { HotelDescriptionResponse } from '../../../../models/hotel/description-models/hotelDescriptionResponse'
import './HotelOverview.scss'

export type Props = {
  hotel: HotelDescriptionResponse
}

function HotelOverview({ hotel }: Props) {
  const imageSrc = hotel.media.mediaUrl ? hotel.media.mediaUrl[0] : undefined

  return (
    <div className="main-content-hotel">
      <div className="hotel-content location-book">
        <div className="image-content-book">
          <img
            className="book-image"
            src={imageSrc}
            role="presentation"
            alt=""
          />
        </div>
        <div className="hotel-details-book">
          <h2 className="hotel-name-book">{hotel.hotelItem.hotelName}</h2>
          <p className="hotel-address-book">
            {hotel.hotelItem.address.streetAddress}
          </p>
          <div className="location-book hotel-address-book">
            <p className="city">
              {hotel.hotelItem.address.cityName},{' '}
              {hotel.hotelItem.address.countryName}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelOverview
