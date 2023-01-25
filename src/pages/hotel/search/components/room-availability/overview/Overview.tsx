import { IoIosCheckmark } from 'react-icons/io'
import map from '../../../../../../assets/images/map.jpg'
import { HotelDescriptionResponse } from '../../../../../../models/hotel/description-models/hotelDescriptionResponse'
import './Overview.css'

export type Props = {
  hotel: HotelDescriptionResponse
}

function Overview({ hotel }: Props) {
  const limit = hotel.services.service
    ? hotel.services.service.slice(0, 12)
    : []
  const service = (
    <>
      {limit &&
        limit.map((service, index) => {
          return (
            <div key={index} className="grid-item">
              {' '}
              <IoIosCheckmark className="iso-mark"></IoIosCheckmark>
              <h1 className="room-type">{service}</h1>
            </div>
          )
        })}
    </>
  )

  return (
    <div className="overview">
      <div className="address-avail">
        <h1 className="hotelName">{hotel.hotelItem.hotelName}</h1>
        <div className="address-field">
          <h1 className="adress">{hotel.hotelItem.address.streetAddress}</h1>
          &nbsp;
          <h1 className="adress">{hotel.hotelItem.address.zipCode}</h1>&nbsp;
          <h1 className="adress">{hotel.hotelItem.address.cityName}</h1>&nbsp;
          <h1 className="adress">{hotel.hotelItem.address.countryName}</h1>
        </div>
        <h2 className="facilities">Facilities</h2>
        <div className="grid-view">{service}</div>
      </div>
      <img src={map} alt="" className="map" />
    </div>
  )
}
export default Overview
