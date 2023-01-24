import { useEffect, useRef } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import { useDispatch, useSelector } from 'react-redux'
import {
  logOutAction,
  userLogOutAction,
} from '../../../../store/actions/logoutAction'
import { userSessionOutAction } from '../../../../store/actions/sessionOutAction'
import {
  getAccessToken,
  getRefreshToken,
} from '../../../../store/selectors/Selectors'
import { clearState } from '../../../../store/stateStorage'
import { Revoke } from '../../api/Revoke'
import AuthConstants from '../../constants/AuthConstants'

const LogoutUser = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector(getAccessToken)
  const refreshToken = useSelector(getRefreshToken)
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
