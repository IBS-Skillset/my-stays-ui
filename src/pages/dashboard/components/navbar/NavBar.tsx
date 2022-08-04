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
              <span className="link-text">Stays</span>
            </div>
          </li>
          <li className="nav-item">
            <div className="nav-link">
              <span className="link-text">Attractions</span>
            </div>
          </li>
          <li className="nav-item">
            <div className="nav-link">
              <span className="link-text">Hotels</span>
            </div>
          </li>
          <li className="nav-item">
            <div className="nav-link">
              <span className="link-text">Contact</span>
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
