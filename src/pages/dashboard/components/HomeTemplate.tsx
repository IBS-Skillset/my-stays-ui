import Header from './header/Header'
import Footer from './footer/Footer'
import { Outlet } from 'react-router'

const HomeTemplate = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
export default HomeTemplate
