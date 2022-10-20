import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../reducers/rootReducer'
import { Revoke } from '../api/Revoke'
import { clearState } from '../../../stateStorage'
import { logOutAction, userLogOutAction } from '../../../actions/logoutAction'
import AuthConstants from '../constants/AuthConstants'
import { useNavigate } from 'react-router-dom'
import { useIdleTimer } from 'react-idle-timer'

const LogoutUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accessToken = useSelector(
    (state: IRootState) => state.token.accessToken,
  )
  const refreshToken = useSelector(
    (state: IRootState) => state.token.refreshToken,
  )
  const logoutFormRef = useRef<HTMLFormElement>(null)

  const dispatchSignout = () => {
    return new Promise<void>((resolve) => {
      dispatch(logOutAction())
      resolve()
    })
  }
  const onMessage = (data: { action: any }) => {
    switch (data.action) {
      case 'LOGOUT_USER':
        dispatch(userLogOutAction(true))
        break
      default:
      // no op
    }
  }

  const { message } = useIdleTimer({
    onMessage,
  })

  useEffect(() => {
    if (refreshToken) {
      Revoke(accessToken, refreshToken).then(async () => {
        clearState()
        dispatchSignout().then(() => {
          message({ action: 'LOGOUT_USER' }, true)
          logoutFormRef?.current?.submit()
        })
      })
    } else {
      console.log('No token available')
      navigate('/')
    }
  }, [])
  return (
    <>
      <form
        ref={logoutFormRef}
        hidden={true}
        action={`${AuthConstants.LOGOUT_URL}`}
        method="post"
      >
        <input type="submit" value="Logout" />
      </form>
    </>
  )
}

export default LogoutUser
