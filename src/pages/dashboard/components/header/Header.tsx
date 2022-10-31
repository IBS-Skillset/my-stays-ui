import { changeLanguage as i18nChangeLang } from 'i18next'
import { FormEvent, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import profileSVG from '../../../../assets/svg/profile.svg'
import languageSVG from '../../../../assets/svg/language.svg'
import { LOCAL_STORAGE_KEYS } from '../../../../constants/appConstants'
import { IRootState } from '../../../../reducers/rootReducer'
import { getSelectedLang } from '../../../../util/web/webStorageUtil'
/*import { NavBar } from '../navbar/NavBar'*/
import './Header.scss'

function Header() {
  const [display, setDisplay] = useState('')

  function showAppBar() {
    display === 'none' ? setDisplay('block') : setDisplay('none')
  }

  const [currentSlectedLanguage, setCurrentSlectedLanguage] = useState(
    getSelectedLang(),
  )

  const accessToken = useSelector(
    (state: IRootState) => state.token.accessToken,
  )

  const parsedAccessToken = parseJwt(accessToken)

  function parseJwt(token: string) {
    if (!token) {
      return
    }
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace('-', '+').replace('_', '/')
    return JSON.parse(window.atob(base64))
  }

  function handleLanguageChange(event: FormEvent<HTMLSelectElement>) {
    sessionStorage.setItem(
      LOCAL_STORAGE_KEYS.SelectedLang,
      event.currentTarget.value,
    )
    i18nChangeLang(event.currentTarget.value)
    setCurrentSlectedLanguage(event.currentTarget.value)
  }

  return (
    <>
      <div className="header">
        <div className="header-container gap-2 justify-between items-center">
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
            <div className="flex flex-row gap-3 justify-between items-center mr-7 ">
              <div className="language-container">
                <img className="flex shrink" src={languageSVG} alt="" />
                <select
                  name="inpt-language"
                  className="input-language"
                  onChange={handleLanguageChange}
                  value={currentSlectedLanguage}
                >
                  <option className="language-options" value="en_us">
                    English
                  </option>
                  <option className="language-options" value="fr_fr">
                    Français
                  </option>
                </select>
              </div>
              {parsedAccessToken != undefined &&
              parsedAccessToken.sub != undefined ? (
                <>
                  <img className="flex shrink" src={profileSVG} alt="" />
                  <p className="text-white profile-text">
                    {parsedAccessToken.sub}
                  </p>
                  <Link className="text-white profile-text" to="/logout">
                    Logout
                  </Link>
                </>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        {/*<div className="nav-container">
          <NavBar display={display}></NavBar>
        </div>*/}
      </div>
    </>
  )
}

export default Header
