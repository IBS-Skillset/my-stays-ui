import React, { useEffect, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from 'react-router-dom'
import AuthConstants from '../../setup/oauth2/constants/AuthConstants'
import { emailAction } from '../../store/actions/emailAction'
import { userLogOutAction } from '../../store/actions/logoutAction'
import { userSessionOutAction } from '../../store/actions/sessionOutAction'
import {
  getAccessToken,
  getAutoFillEmail,
  getIsLoggedOut,
  getIsSessionOut,
} from '../../store/selectors/Selectors'
import './Signin.scss'

function SignIn() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const autoFillEmail = useSelector(getAutoFillEmail)
  const accessToken = useSelector(getAccessToken)
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    setEmail(autoFillEmail)
    dispatch(emailAction(autoFillEmail))
  }, [autoFillEmail])

  useEffect(() => {
    if (accessToken && location.state && !location.state.fetchUserError) {
      navigate('/')
    }
  })
  const toggle = () => {
    setOpen(!open)
  }
  const isLoggedOut = useSelector(getIsLoggedOut)
  jjj

  const isSessionOut = useSelector(getIsSessionOut)

  const msg2 = (
    <div className="message">
      <h5>Account already exists! Please sign in</h5>
    </div>
  )
  const msg3 = (
    <div className="message">
      <h5>Unable to fetch details! Please try again later</h5>
    </div>
  )

  if (isLoggedOut) {
    setTimeout(() => {
      dispatch(userLogOutAction(false))
    }, 3000)
  }
  if (isSessionOut) {
    setTimeout(() => {
      dispatch(userSessionOutAction(false))
    }, 3000)
  }

  return (
    <>
      {autoFillEmail && (
        <div className="message">
          <h5>User successfully created. Enter the password to proceed</h5>
        </div>
      )}
      <div className="outer-box">
        <div className="inner-box">
          {location.state && location.state.accountSvcError ? msg2 : <></>}
          {location.state && location.state.fetchUserError ? msg3 : <></>}
          {searchParams.get('error') && (
            <span className="errorMsg">{AuthConstants.ERROR_SIGN_IN}</span>
          )}
          {isLoggedOut && !searchParams.get('error') && !autoFillEmail && (
            <span className="errorMsg">{AuthConstants.LOGOUT_MESSAGE}</span>
          )}
          {isSessionOut && (
            <span className="errorMsg">
              {AuthConstants.SESSION_OUT_MESSAGE}
            </span>
          )}
          <h2 className="signin-heading">Sign in</h2>
          <div>
            <form
              action={`${AuthConstants.LOGIN_URL}`}
              method="post"
              className=" relative"
              aria-label="sign-in"
            >
              <div className="bg-white rounded-sm h-12 mb-6 relative">
                <input
                  type="email"
                  required
                  id="username"
                  name="username"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value)
                    dispatch(emailAction(e.target.value))
                  }}
                  value={email}
                  className="input-box"
                  placeholder="Email"
                />
              </div>
              <div className="bg-white rounded-sm h-12 mb-6 relative">
                <input
                  type={!open ? 'password' : 'text'}
                  required
                  autoComplete="off"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="input-box"
                  placeholder="Password"
                />
              </div>
              <div className="eye-icon">
                {!open ? (
                  <AiFillEyeInvisible aria-label="eye-icon" onClick={toggle} />
                ) : (
                  <AiFillEye aria-label="eye-icon-open" onClick={toggle} />
                )}
              </div>
              <div className="flex items-center justify-between mb-2">
                <button className="btn-continue">Sign in</button>
              </div>
            </form>
            <p className=" p-4 text-center select-none text-white">
              Don&apos;t have an account? <></>
              <Link to="/signup" className="text-white hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
