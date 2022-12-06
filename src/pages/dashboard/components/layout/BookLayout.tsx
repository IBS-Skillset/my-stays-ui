import Header from '../header/Header'
import Footer from '../footer/Footer'
import { Outlet } from 'react-router'
import './Layout.scss'
import BookHeader from '../../../hotel/booking/book-header/BookHeader'

const BookLayout = () => {
  return (
    <>
      <div className="home-outline">
        <Header />
      </div>
      <BookHeader />
      <Outlet />
      <Footer />
    </>
  )
}
export default BookLayout
