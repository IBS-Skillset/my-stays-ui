import { Route, Routes } from 'react-router-dom'
import ErrorPage from '../../pages/errorPages/errorPage'
import SignIn from '../../pages/sign-in/SignIn'
import SignUp from '../../pages/sign-up/SignUp'
import AuthorizeUser from '../oauth2/components/AuthorizeUser'
import LogoutUser from '../oauth2/components/LogoutUser'
import HomeLayout from '../../pages/dashboard/components/layout/HomeLayout'
import Search from '../../pages/home/Search'
import HotelSearch from '../../pages/hotel/search/components/search-results/HotelSearch'
import SearchLayout from '../../pages/dashboard/components/layout/SearchLayout'
import HotelDescription from '../../pages/hotel/search/components/room-availability/HotelDescription'
import BookConfirmation from '../../pages/hotel/booking/BookConfirmation'
import BookLayout from '../../pages/dashboard/components/layout/BookLayout'

function routes() {
  return (
    <Routes>
      <Route path="" element={<HomeLayout />}>
        <Route path="/" element={<Search />} />
        <Route path="/home" element={<Search />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route path="" element={<SearchLayout />}>
        <Route path="/search" element={<HotelSearch />} />
        <Route path="/hotel/:hotelCode" element={<HotelDescription />} />
      </Route>
      <Route path="/authorized" element={<AuthorizeUser />} />
      <Route path="/logout" element={<LogoutUser />} />
      <Route path="" element={<BookLayout />}>
        <Route path="/bookingConfirmation" element={<BookConfirmation />} />
      </Route>
    </Routes>
  )
}

export default routes
