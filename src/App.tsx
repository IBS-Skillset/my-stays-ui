import Routes from './setup/routes/routes'
import Loader from './pages/loader/Loader'

import { useSelector } from 'react-redux'
import { IRootState } from './reducers/rootReducer'
import { useCommonInterseptor } from './interceptor/commonInterseptor'
import { useIdleTimer } from 'react-idle-timer'
import { useNavigate } from 'react-router-dom'
import useAuthInterceptor from './interceptor/useAuthInterceptor'

function App() {
  const isloading = useSelector((state: IRootState) => state.loader.showLoading)
  useCommonInterseptor()

  const accessToken = useSelector(
    (state: IRootState) => state.token.accessToken,
  )

  const refreshToken = useSelector(
    (state: IRootState) => state.token.refreshToken,
  )

  useAuthInterceptor(accessToken, refreshToken)

  const navigate = useNavigate()
  const onPrompt = () => {
    window.alert('You will be logged out automatically in 1 minute')
  }

  const handleOnIdle = () => {
    console.log('user is idle')
    console.log('last active', getLastActiveTime())
    navigate('/logout')
  }

  const handleOnActive = (event: any) => {
    console.log('user is active', event)
    console.log('time remaining', getRemainingTime())
  }

  const handleOnAction = (event: any) => {
    console.log('user did something', event)
  }

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * 14,
    promptTimeout: 1000 * 60 * 1,
    onPrompt: onPrompt,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
    crossTab: true,
  })
  return (
    <>
      {isloading && <Loader />}
      <div style={isloading ? { display: 'none' } : { display: 'block' }}>
        <Routes />
      </div>
    </>
  )
}

export default App
