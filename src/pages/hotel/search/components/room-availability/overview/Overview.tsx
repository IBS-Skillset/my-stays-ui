import React from 'react'
import map from '../../../../../../assets/images/map.jpg'
import { HotelDescriptionResponse } from '../../../../../../models/hotel/description-models/hotelDescriptionResponse'
import './Overview.css'

export type Props = {
  hotel: HotelDescriptionResponse
}

function Overview({ hotel }: Props) {
  return (
    <div className="overview">
      <div className="address-avail">
        <h1 className="hotelName">Crown Plaza</h1>
        <div className="address-field">
          <h1 className="adress">{hotel.hotelItem.address.countryName}</h1>,
          <h1 className="adress">{hotel.hotelItem.address.streetAddress}</h1>,
          <h1 className="adress">{hotel.hotelItem.address.zipCode}</h1>
        </div>
      </div>
      <img src={map} alt="" className="map" />
    </div>
  )
}
export default Overview
