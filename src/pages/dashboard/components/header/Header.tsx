import { useState } from 'react'
import { NavBar } from '../navbar/NavBar'
import './Header.scss'

function Header() {
  const [display, setDisplay] = useState('')

  function showAppBar() {
    display === 'none' ? setDisplay('block') : setDisplay('none')
  }

  return (
    <>
      <div className="header">
        <div className="header-container justify-start items-center">
            <div className="app-bar-menu h-8 w-8 ml-2" onClick={showAppBar}>
              <div className="app-bar"></div>
              <div className="app-bar"></div>
              <div className="app-bar"></div>
            </div>
            <div className="box-container">
              <div className="brand-banner">Hotels.com</div>
            </div>
        </div>
        <div className="box-container">
          <NavBar display={display}></NavBar>
        </div>
      </div>
    </>
  )
}

export default Header
