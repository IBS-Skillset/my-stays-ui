import './Search.scss'
import calendarSVG from '../../../assets/svg/calendar.svg'
import locationSVG from '../../../assets/svg/location.svg'
import personSVG from '../../../assets/svg/person.svg'
import React from 'react'
import { FaBuilding, FaCar } from 'react-icons/fa'
import { IoAirplane } from 'react-icons/io5'

function Search() {
  return (
    <body>
      <div className="main">
        <form className="inner-form">
          <div className="heading">Search Hotels</div>
          <div className="travel-type-wrap">
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
          <div className="main-form">
            <div className="bg-white rounded-sm h-16 mb-2 relative">
              <div className="icon-wrap">
                <img src={locationSVG} alt="" className="svg-image" />
              </div>
              <div className="input-field">
                <label className="label">
                  GOING TO
                  <input
                    className="input"
                    type="text"
                    placeholder="Destination, hotel name"
                    autoComplete="off"
                  />
                </label>
              </div>
            </div>
            <div className="box-border flex h-16 mb-2 p-5">
              <div className="input-wrap">
                <div className="icon-wrap">
                  <img src={calendarSVG} alt="" className="svg-image" />
                </div>
                <div className="input-field">
                  <label className="label">
                    CHECK IN
                    <input
                      className="input"
                      type="text"
                      placeholder="mm/dd/yy"
                    />
                  </label>
                </div>
              </div>
              <div className="bg-white rounded-sm h-16 relative w-56">
                <div className="icon-wrap">
                  <img src={calendarSVG} alt="" className="svg-image" />
                </div>
                <div className="input-field">
                  <label className="label">
                    CHECK OUT
                    <input
                      className="input"
                      type="text"
                      placeholder="mm/dd/yy"
                    />
                  </label>
                </div>
              </div>
              <div className="input-wrap3">
                <div className="icon-wrap">
                  <img src={personSVG} alt="" className="svg-image" />
                </div>
                <div className="input-field">
                  <label className="label">
                    TRAVELERS
                    <input
                      className="input"
                      type="text"
                      placeholder="1 adult"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="h-12 p-10">
              <button className="btn-search">Search</button>
            </div>
          </div>
        </form>
      </div>
    </body>
  )
}
export default Search
