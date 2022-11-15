import { FaBuilding, FaCar } from 'react-icons/fa'
import { IoAirplane } from 'react-icons/io5'
import React, { CSSProperties } from 'react'
import './SearchHeader.scss'

export type Props = {
  travelWrapStyle: CSSProperties
}

export const SearchHeader = ({ travelWrapStyle }: Props) => {
  return (
    <div className="travel-type-wrap" style={travelWrapStyle}>
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
