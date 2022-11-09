import { FaBuilding, FaCar } from 'react-icons/fa'
import { IoAirplane } from 'react-icons/io5'
import React from 'react'
import './SearchHeader.scss'
import { useLocation } from 'react-router'

export const SearchHeader = () => {
  const { pathname } = useLocation()
  const style1 = { marginLeft: pathname === '/search' ? '132px' : '0px' }
  const style2 = { marginBottom: pathname === '/search' ? '15px' : '100px' }
  return (
    <div className="travel-type-wrap" style={{ ...style1, ...style2 }}>
      <div className="item active">
        <div className="group-icon">
          <FaBuilding className="icon" />
        </div>
        <div className="text">HOTEL ONLY</div>
      </div>
      <div className="item cursor">
        <div className="group-icon">
          <FaBuilding className="icon" />
          <IoAirplane className="icon" />
        </div>
        <div className="text">HOTEL + FLIGHT</div>
      </div>
      <div className="item cursor">
        <div className="group-icon">
          <FaBuilding className="icon" />
          <IoAirplane className="icon" />
          <FaCar className="icon" />
        </div>
        <div className="text">HOTEL + FLIGHT + CAR</div>
      </div>
      <div className="item cursor">
        <div className="group-icon">
          <FaBuilding className="icon" />
          <FaCar className="icon" />
        </div>
        <div className="text">HOTEL + CAR</div>
      </div>
    </div>
  )
}
