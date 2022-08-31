import Footer from './pages/dashboard/components/footer/Footer'
import Header from './pages/dashboard/components/header/Header'
import Routes from './setup/routes/routes'
import Loader from './pages/loader/Loader'

import { useSelector } from 'react-redux'
import { IRootState } from './reducers/rootReducer'
import { useCommonInterseptor } from './interceptor/commonInterseptor'
import React, { useState } from 'react'
import Authorize from './setup/oauth2/components/Authorize'

function App() {
  const isloading = useSelector((state: IRootState) => state.loader.showLoading)
  useCommonInterseptor()

  const [token, setToken] = useState()

  const signIn = sessionStorage.getItem('signed_in')

  if (!token && signIn == 'signin') {
    return <Authorize setToken={setToken} />
  }

  /*  const accessToken = sessionStorage.getItem('access_token')

  if (null == accessToken || accessToken == undefined) {
    const verifier = generateCodeVerifier()
    sessionStorage.setItem('codeVerifier', verifier)
    const codeChallenge = generateCodeChallenge()
    sessionStorage.setItem('codeChallenge', codeChallenge)

    return <SignIn />
  }*/

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
