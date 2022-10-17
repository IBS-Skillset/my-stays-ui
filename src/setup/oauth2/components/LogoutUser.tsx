import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../reducers/rootReducer'
import { Revoke } from '../api/Revoke'
import { clearState } from '../../../stateStorage'
import { logOutAction, userLogOutAction } from '../../../actions/logoutAction'
import AuthConstants from '../constants/AuthConstants'

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

  useEffect(() => {
    if (refreshToken) {
      Revoke(accessToken, refreshToken).then(async (response) => {
        const token = await response.json()
        console.log(token)
        clearState()
        dispatchSignout().then(() => {
          dispatch(userLogOutAction(true))
          logoutFormRef?.current?.submit()
        })
      })
    } else {
      console.log('No token available')
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
