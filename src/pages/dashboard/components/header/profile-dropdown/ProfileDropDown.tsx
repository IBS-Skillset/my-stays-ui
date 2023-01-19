import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import dropDownSVG from '../../../../../assets/svg/dropdown.svg'
import profileSVG from '../../../../../assets/svg/profile.svg'
import {
  getEmail,
  getFirstName,
  getLastName,
} from '../../../../../store/selectors/Selectors'
import './ProfileDropDown.scss'
import useComponentVisible from './useComponentVisible'

export const ProfileDropDown = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false)
  const showProfile = () => {
    setIsComponentVisible(!isComponentVisible)
  }
  const emailid = useSelector(getEmail)
  const firstName = useSelector(getFirstName)
  const lastName = useSelector(getLastName)

  return (
    <div className="profile">
      <button className="dropdown-menu" type="button" onClick={showProfile}>
        <img className="flex shrink pr-1" src={profileSVG} alt="" />
        <p className="text-white profile-text">
          {firstName}&nbsp;{lastName}
        </p>
        <img className="flex shrink" src={dropDownSVG} alt="" />
      </button>
      {isComponentVisible && (
        <div ref={ref} className="dropdown-profile">
          <div className="dropdown-user">
            <div className="font-medium ">
              {firstName}&nbsp;{lastName}
            </div>
            <div className="truncate">{emailid}</div>
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
