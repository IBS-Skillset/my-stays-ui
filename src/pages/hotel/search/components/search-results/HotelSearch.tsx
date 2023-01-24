import 'react-datepicker/dist/react-datepicker.css'
import { useSelector } from 'react-redux'
import map from '../../../../../assets/images/map.jpg'
import searchIcon from '../../../../../assets/images/search-icon.png'
import AuthorizeUser from '../../../../../setup/oauth2/components/authorize/AuthorizeUser'
import DispatchPkceData from '../../../../../setup/oauth2/pkce/DispatchPkceData'
import {
  getAccessToken,
  getIsAuthorized,
} from '../../../../../store/selectors/Selectors'
import SearchForm from './../search-form/SearchForm'
import './HotelSearch.scss'
import SearchResults from './result/SearchResults'

function HotelSearch() {
  const accessToken = useSelector(getAccessToken)
  const isAuthorized = useSelector(getIsAuthorized)
  if (accessToken == '') {
    if (!isAuthorized) {
      DispatchPkceData()
    }
    return <AuthorizeUser />
  }

  return (
    <>
      <div className="main-content">
        <SearchForm />
        <div className="mt-2">
          <div className="sorting-container">
            <div className="sort">Sort</div>
            <div className="best-match">Best match</div>
            <div className="match">Top Viewed</div>
            <div className="lowest-price">Lowest price first</div>
            <div className="match">Distance</div>
          </div>
          <div className="flex mt-5 ml-24">
            <div className="filters">
              <div className="h-40 w-64">
                <img src={map} alt="" className="h-40 w-64" />
              </div>
              <div className="border-black border-solid border-t mt-6 w-64">
                <h1 className="search-heading">Search by property name</h1>
                <div className="border-black rounded border-solid border flex h-10 mt-5 text-left w-64">
                  <img src={searchIcon} alt="" className="h-6 mt-2 ml-2 w-6" />
                  <h1 className="mt-2 ml-2">eg: Marriot</h1>
                </div>
                <div className="border-black border-solid border-t mt-5">
                  <h1 className="hotel-chains-heading">Hotel Chains</h1>
                  <div className="mt-2 w-64">
                    <input className="mr-2" type="checkbox" />
                    Accor
                  </div>
                  <div className="mt-2 w-64">
                    <input className="mr-2" type="checkbox" />
                    Bloom Hotels
                  </div>
                  <div className="mt-2 w-64">
                    <input className="mr-2" type="checkbox" />
                    Clark Inn
                  </div>
                  <div className="mt-2 w-64">
                    <input className="mr-2" type="checkbox" />
                    Hyatt
                  </div>
                  <div className="mt-2 w-64">
                    <input className="mr-2" type="checkbox" />
                    Crown Plaza
                  </div>
                </div>
              </div>
            </div>
            <div className="search-result">
              <SearchResults />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HotelSearch
