import { Route, Routes } from 'react-router-dom'
import ErrorPage from '../../pages/errorPages/errorPage'
import HotelSearch from '../../pages/hotel/search/components/HotelSearch'
import SignIn from '../../pages/sign-in/SignIn'
import SignUp from '../../pages/sign-up/SignUp'

function routes() {
  return (
    <Routes>
      <Route path="/" element={<HotelSearch />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default routes
