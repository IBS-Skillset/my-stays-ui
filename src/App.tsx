import Footer from './pages/dashboard/components/footer/Footer'
import Header from './pages/dashboard/components/header/Header'
import Routes from './setup/routes/routes'
import Loader from './pages/loader/Loader'

import { useSelector } from 'react-redux'
import { IRootState } from './reducers/rootReducer'
import { useCommonInterseptor } from './interceptor/commonInterseptor'

function App() {
  const isloading = useSelector((state: IRootState) => state.loader.showLoading)
  useCommonInterseptor()
  return (
    <>
      {isloading && <Loader />}
      <div style={isloading ? { display: 'none' } : { display: 'block' }}>
        <Header />
        <Routes />
        <Footer />
      </div>
    </>
  )
}

export default App
