import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { IRootState } from '../../../../../store/reducers/rootReducer'
import DispatchPkceData from '../../../../../setup/oauth2/pkce/DispatchPkceData'
import AuthorizeUser from '../../../../../setup/oauth2/components/AuthorizeUser'
import './Hotel.scss'
import ModalPopup from './RoomList'
import map from '../../../../../assets/images/map.jpg'
import SearchForm from '../search-form/SearchForm'

function Hotel() {
  const code = useSelector(
    (state: IRootState) => state.hotel.hotelCode.hotelCode,
  )
  const hotel = useSelector(
    (state: IRootState) =>
      state.hotel.descriptionResponse.hotelDescriptionResponsesPerCode[code],
  )
  const [show, setShow] = useState(false)
  const types = ['Overview', 'Rooms']
  const [active, setActive] = useState('Overview')
  const displayImages = hotel.media.mediaUrl
    ? hotel.media.mediaUrl.slice(0, 6)
    : []
  const numberOfImages = hotel.media.mediaUrl.length - 6

  const accessToken = useSelector(
    (state: IRootState) => state.token.accessToken,
  )
  const isAuthorized = useSelector(
    (state: IRootState) => state.authorize.isAuthorized,
  )

  if (accessToken == '') {
    if (!isAuthorized) {
      DispatchPkceData()
    }
    return <AuthorizeUser />
  }

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
        {active == 'Rooms' && <ModalPopup />}
      </div>
    </div>
  )
}
export default Hotel
