import { Route, Routes } from 'react-router-dom'
import ErrorPage from '../../pages/errorPages/errorPage'
import HotelSearch from '../../pages/hotel/search/components/HotelSearch'
import SignIn from '../../pages/sign-in/SignIn'
import SignUp from '../../pages/sign-up/SignUp'
import Authorize from '../oauth2/components/Authorize'
import Revoke from '../oauth2/components/Revoke'

function routes() {
  const home = '/home'
  return (
    <Routes>
      <Route path="/" element={<HotelSearch />} />
      <Route path="/home" element={<HotelSearch />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/authorized" element={<Authorize link={home} />} />
      <Route path="/logout" element={<Revoke />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default routes
