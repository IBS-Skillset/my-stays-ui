import { Route, Routes } from 'react-router-dom'
import ErrorPage from '../../pages/errorPages/errorPage'
import HotelSearch from '../../pages/hotel/search/components/HotelSearch'
import SignIn from '../../pages/sign-in/SignIn'
import SignUp from '../../pages/sign-up/SignUp'
import AuthorizeUser from '../oauth2/components/AuthorizeUser'
import LogoutUser from '../oauth2/components/LogoutUser'

function routes() {
  return (
    <Routes>
      <Route path="/" element={<HotelSearch />} />
      <Route path="/home" element={<HotelSearch />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/authorized" element={<AuthorizeUser />} />
      <Route path="/logout" element={<LogoutUser />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default routes
