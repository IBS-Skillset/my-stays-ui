import React from 'react'
import { HotelDescriptionResponse } from '../../../../../models/hotel/description-models/hotelDescriptionResponse'
import './HotelOverview.scss'

export type Props = {
  hotel: HotelDescriptionResponse
}

function HotelOverview({ hotel }: Props) {
  const imageSrc = hotel.media.mediaUrl ? hotel.media.mediaUrl[0] : undefined

  return (
    <div className="main-content-hotel">
      <div className="hotel-content location-book">
        <div className="location-book">
          <div className="book-image-parent">
            <img
              className="book-image"
              src={imageSrc}
              role="presentation"
              alt=""
            />
          </div>
        </div>
        <div className="hotel-details-book">
          <h2 className="hotel-name-book">{hotel.hotelItem.hotelName}</h2>
          <div className="hotel-address-book">
            <h1 className="city">{hotel.hotelItem.address.streetAddress}</h1>
            <h1 className="city">{hotel.hotelItem.address.zipCode}</h1>
            <h1 className="city">{hotel.hotelItem.address.countryName}</h1>
            <h1 className="city">{hotel.hotelItem.address.cityName}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelOverview
