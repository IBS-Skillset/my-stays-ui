import Header from '../header/Header'
import { Outlet } from 'react-router'
import Footer from '../footer/Footer'
import { SearchHeader } from '../../../home/search-header/SearchHeader'
import './Layout.scss'

const SearchLayout = () => {
  return (
    <>
      <div className="home-outline">
        <Header />
        <SearchHeader />
      </div>
      <Outlet />
      <Footer />
    </>
  )
}

export default SearchLayout
