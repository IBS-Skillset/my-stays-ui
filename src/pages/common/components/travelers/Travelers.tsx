import personSVG from '../../../../assets/svg/person.svg'
import React from 'react'

const Travelers = () => {
  return (
    <div className="travelers-container">
      <div className="travelers-image-container">
        <img src={personSVG} alt="" className="travelers-image" />
      </div>
      <div className="travelers-input-container">
        <label className="travelers-label">
          TRAVELERS
          <input
            className="travelers-input"
            type="text"
            placeholder="1 adult"
          />
        </label>
      </div>
    </div>
  )
}

export default Travelers
