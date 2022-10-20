import React from 'react'
import { FaBuilding, FaCar } from 'react-icons/fa'
import { IoAirplane } from 'react-icons/io5'
import './HotelSearchUpdated.scss'
function HotelSearchUpdated() {
  return (
    <div className="travel-type-wrap">
      <div className="item hover:bg-blue-600">
        <div className="group-icon">
          <FaBuilding className="icon" />
        </div>
        <div className="text">HOTEL ONLY</div>
      </div>
      <div className="item hover:bg-blue-600">
        <div className="group-icon">
          <FaBuilding className="icon" />
          <IoAirplane className="icon" />
        </div>
        <div className="text">HOTEL + FLIGHT</div>
      </div>
      <div className="item hover:bg-blue-600">
        <div className="group-icon">
          <FaBuilding className="icon" />
          <IoAirplane className="icon" />
          <FaCar className="icon" />
        </div>
        <div className="text">HOTEL + FLIGHT + CAR</div>
      </div>
      <div className="item hover:bg-blue-600">
        <div className="group-icon">
          <FaBuilding className="icon" />
          <FaCar className="icon" />
        </div>
        <div className="text">HOTEL + CAR</div>
      </div>
    </div>
  )
}

export default HotelSearchUpdated
