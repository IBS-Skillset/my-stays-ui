import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../reducers/rootReducer'
import { Revoke } from '../api/Revoke'
import { clearState } from '../../../stateStorage'
import { logOutAction, userLogOutAction } from '../../../actions/logoutAction'
import AuthConstants from '../constants/AuthConstants'
import { useIdleTimer } from 'react-idle-timer'
import { userSessionOutAction } from '../../../actions/sessionOutAction'

const LogoutUser = () => {
  const dispatch = useDispatch()
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
      case 'SESSIONOUT_USER':
        console.log('enter session out')
        dispatch(userSessionOutAction(true))
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
      dispatchSignout().then(() => {
        message({ action: 'SESSIONOUT_USER' }, true)
        logoutFormRef?.current?.submit()
      })
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
