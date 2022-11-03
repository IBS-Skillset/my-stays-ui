import Header from '../header/Header'
import Footer from '../footer/Footer'
import { Outlet } from 'react-router'
import './Layout.scss'

const HomeLayout = () => {
  return (
    <div className="home-outline">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
export default HomeLayout
