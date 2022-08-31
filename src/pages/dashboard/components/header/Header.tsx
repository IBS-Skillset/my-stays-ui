import { useState } from 'react'
import profileSVG from '../../../../assets/svg/profile.svg'
import { NavBar } from '../navbar/NavBar'
import './Header.scss'
import { Link } from 'react-router-dom'

function Header() {
  const [display, setDisplay] = useState('')

  function showAppBar() {
    display === 'none' ? setDisplay('block') : setDisplay('none')
  }

  return (
    <>
      <div className="header">
        <div className="header-container justify-between items-center">
          <div
            role="presentation"
            className="app-bar-menu h-8 w-8 ml-2"
            onClick={showAppBar}
            onKeyDown={showAppBar}
          >
            <div className="app-bar"></div>
            <div className="app-bar"></div>
            <div className="app-bar"></div>
          </div>
          <div className="box-container flex justify-between items-center">
            <div className="brand-banner">myStays.com</div>
            <div className="flex justify-between items-center mr-7 ">
              <img src={profileSVG} alt="" />
              <p className="text-white pl-3 profile-text">foobar</p>
              <Link className="text-white pl-3 profile-text" to={'/signin'}>
                Signin
              </Link>
              <Link className="text-white pl-3 profile-text" to={'/logout'}>
                Logout
              </Link>
            </div>
          </div>
        </div>
        <div className="nav-container">
          <NavBar display={display}></NavBar>
        </div>
      </div>
    </>
  )
}

export default Header
