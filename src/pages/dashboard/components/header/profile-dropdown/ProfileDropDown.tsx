import profileSVG from '../../../../../assets/svg/profile.svg'
import dropDownSVG from '../../../../../assets/svg/dropdown.svg'
import useComponentVisible from './useComponentVisible'
import './ProfileDropDown.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IRootState } from '../../../../../store/reducers/rootReducer'

export const ProfileDropDown = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false)
  const showProfile = () => {
    setIsComponentVisible(!isComponentVisible)
  }
  const emailid = useSelector((state: IRootState) => state.email.email)
  const firstName = useSelector(
    (state: IRootState) => state.userDetails.userDetails.firstName,
  )
  const lastName = useSelector(
    (state: IRootState) => state.userDetails.userDetails.lastName,
  )
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
