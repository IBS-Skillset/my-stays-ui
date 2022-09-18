import { changeLanguage as i18nChangeLang } from 'i18next'
import { FormEvent, useState } from 'react'
import profileSVG from '../../../../assets/svg/profile.svg'
import { LOCAL_STORAGE_KEYS } from '../../../../constants/appConstants'
import { NavBar } from '../navbar/NavBar'
import './Header.scss'
import { getSelectedLang } from '../../../../util/web/webStorageUtil'

function Header() {
  const [display, setDisplay] = useState('')

  function showAppBar() {
    display === 'none' ? setDisplay('block') : setDisplay('none')
  }

  const [currentSlectedLanguage, setCurrentSlectedLanguage] = useState(
    getSelectedLang(),
  )

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
            className="block md:hidden h-8 w-8 ml-2"
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
              <select
                name="inpt-language"
                className="inpt-language"
                onChange={handleLanguageChange}
                value={currentSlectedLanguage}
              >
                <option value="en_us">English</option>
                <option value="fr_fr">Français</option>
              </select>
              <img className="flex shrink" src={profileSVG} alt="" />
              <p className="text-white profile-text">foobar</p>
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
