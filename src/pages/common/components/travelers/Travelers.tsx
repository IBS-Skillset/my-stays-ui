import personSVG from '../../../../assets/svg/person.svg'
import React from 'react'

const Travelers = () => {
  return (
    <div className="travelers-container">
      <div className="travelers-image-container">
        <img src={personSVG} alt="" className="travelers-image" />
      </div>
      <div className="travelers-input-container">
        <div className="travelers-label">
          TRAVELERS
          <h1 className="travelers-input">1 adult</h1>
        </div>
      </div>
    </div>
  )
}

export default Travelers
