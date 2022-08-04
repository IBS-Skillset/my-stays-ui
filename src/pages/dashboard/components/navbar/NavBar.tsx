import { NavLink } from 'react-router-dom'
import './NavBar.scss'

interface NavBarProps {
  display: string
}
export const NavBar = ({ display }: NavBarProps) => {
  return (
    <>
      <nav className="navbar" style={{ display: display }}>
        <ul className="navbar-nav">
          <li className="nav-item">
            <div className="nav-link">
              <NavLink to="/" className="link-text">
                Stays
              </NavLink>
            </div>
          </li>
          <li className="nav-item">
            <div className="nav-link">
              <NavLink to="/" className="link-text">
                Attractions
              </NavLink>
            </div>
          </li>
          <li className="nav-item">
            <div className="nav-link">
              <NavLink to="/" className="link-text">
                Hotels
              </NavLink>
            </div>
          </li>
          <li className="nav-item">
            <div className="nav-link">
              <NavLink to="/signin" className="link-text">
                Log Out
              </NavLink>
            </div>
          </li>
          <li
            className="nav-item svg-inline--fa fa-moon-stars fa-w-16 fa-7x"
            id="themeButton"
          ></li>
        </ul>
      </nav>
    </>
  )
}
