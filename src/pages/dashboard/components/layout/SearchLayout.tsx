import Header from '../header/Header'
import { Outlet } from 'react-router'
import Footer from '../footer/Footer'
import { SearchHeader } from '../../../home/search-header/SearchHeader'
import './Layout.scss'

const SearchLayout = () => {
  const travelWrapStyle = {
    marginLeft: '132px',
    marginBottom: '15px',
  }
  return (
    <>
      <div className="home-outline">
        <Header />
        <SearchHeader travelWrapStyle={travelWrapStyle} />
      </div>
      <Outlet />
      <Footer />
    </>
  )
}

export default SearchLayout
