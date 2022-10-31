import { Route, Routes } from 'react-router-dom'
import ErrorPage from '../../pages/errorPages/errorPage'
import SignIn from '../../pages/sign-in/SignIn'
import SignUp from '../../pages/sign-up/SignUp'
import AuthorizeUser from '../oauth2/components/AuthorizeUser'
import LogoutUser from '../oauth2/components/LogoutUser'
import HomeTemplate from '../../pages/dashboard/components/HomeTemplate'
import Search from '../../pages/hotel/newui/Search'

function routes() {
  return (
    <Routes>
      <Route path="" element={<HomeTemplate />}>
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<Search />} />
        <Route path="/home" element={<Search />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route path="/authorized" element={<AuthorizeUser />} />
      <Route path="/logout" element={<LogoutUser />} />
    </Routes>
  )
}

export default routes
