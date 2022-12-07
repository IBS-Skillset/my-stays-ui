import profileSVG from '../../../../../assets/svg/profile.svg'
import dropDownSVG from '../../../../../assets/svg/dropdown.svg'
import useComponentVisible from './useComponentVisible'
import './ProfileDropDown.scss'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const ProfileDropDown = (token: any) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    if (token.token.sub) {
      setUserName(token.token.sub)
    }
  }, [token])

  const showProfile = () => {
    setIsComponentVisible(!isComponentVisible)
  }

  return (
    <div className="profile">
      <button className="dropdown-menu" type="button" onClick={showProfile}>
        <img className="flex shrink pr-1" src={profileSVG} alt="" />
        <p className="text-white profile-text">{userName}</p>
        <img className="flex shrink" src={dropDownSVG} alt="" />
      </button>
      {isComponentVisible && (
        <div ref={ref} className="dropdown-profile">
          <div className="dropdown-user">
            <div className="font-medium ">{userName}</div>
            <div className="truncate">test@gmail.com</div>
          </div>
          <ul className="dropdown-nav">
            <li>
              <Link className="dropdown-link" to="/">
                My Profile
              </Link>
            </li>
            <li>
              <Link className="dropdown-link" to="/mytrips">
                My Trips
              </Link>
            </li>
            <li>
              <Link className="dropdown-link" to="/home">
                Stays
              </Link>
            </li>
          </ul>
          <div className="py-1">
            <Link className="dropdown-logout" to="/logout">
              Logout
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
