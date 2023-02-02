import Loader from './pages/common/loader/Loader'
import Routes from './setup/routes/routes'

import { useIdleTimer } from 'react-idle-timer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './App.scss'
import { useCommonInterseptor } from './interceptor/commonInterseptor'
import useAuthInterceptor from './interceptor/useAuthInterceptor'
import { getIsLoading } from './store/selectors/Selectors'
import CommonConstants from './constants/CommonConstants'

function App() {
  const isloading = useSelector(getIsLoading)
  useCommonInterseptor()
  useAuthInterceptor()

  const navigate = useNavigate()
  const onPrompt = () => {
    window.alert(CommonConstants.LOGGED_OUT)
  }

  const handleOnIdle = () => {
    console.log(CommonConstants.USER_IDLE)
    console.log(CommonConstants.LAST_ACTIVE, getLastActiveTime())
    navigate('/logout')
  }

  const handleOnActive = (event: any) => {
    console.log(CommonConstants.USER_ACTIVE, event)
    console.log(CommonConstants.TIME_REMAINING, getRemainingTime())
  }

  const handleOnAction = (event: any) => {
    console.log(CommonConstants.DID_SOMETHING, event)
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
      <div
        className="outline"
        style={isloading ? { display: 'none' } : { display: 'block' }}
      >
        <Routes />
      </div>
    </>
  )
}

export default App
