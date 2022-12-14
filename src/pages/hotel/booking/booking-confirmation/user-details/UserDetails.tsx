import React from 'react'
import { useSelector } from 'react-redux'
import { IRootState } from '../../../../../store/reducers/rootReducer'

import './UserDetails.css'

function UserDetails() {
  const userDetails = useSelector(
    (state: IRootState) => state.userDetails.userDetails,
  )
  return (
    <div className="user-details border-color">
      <div className="ml-1">
        <h1 className="text-lg mt-1 ml-2 font-weight">Enter your details</h1>
      </div>
      <div className="enter-details">
        <div className="details">
          <div className="user-info">
            <h1 className="headings font-weight">
              First name <span className="mandatory">*</span>
            </h1>
            <div className="rounded-sm bg-white name border-color">
              <h1 className="values headings">{userDetails.firstName}</h1>
            </div>
          </div>
          <div className="user-info">
            <h1 className="headings font-weight">
              Last name <span className="mandatory">*</span>
            </h1>
            <div className="rounded-sm bg-white name border-color">
              <h1 className="values headings">{userDetails.lastName}</h1>
            </div>
          </div>
        </div>
        <div className="user-info">
          <h2 className="headings font-weight">
            Email address <span className="mandatory">*</span>
          </h2>
          <div className="rounded-sm bg-white email border-color">
            <h1 className="values headings">{userDetails.email}</h1>
          </div>
          <h1 className="email-message headings">
            Confirmation email goes to this address
          </h1>
        </div>
      </div>
      <div className="mobile-field">
        <h1 className="headings font-weight">
          Mobile Phone <span className="mandatory">*</span>
        </h1>
        <div className="rounded-sm bg-white email border-color">
          <h1 className="values headings">{userDetails.phone}</h1>
        </div>
      </div>
    </div>
  )
}
export default UserDetails
