import React, { useEffect, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
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
  const [open, setOpen] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const autoFillEmail = useSelector(getAutoFillEmail)
  const accessToken = useSelector(getAccessToken)
  const navigate = useNavigate()
  useEffect(() => {
    setEmail(autoFillEmail)
    dispatch(emailAction(autoFillEmail))
  }, [autoFillEmail])

  useEffect(() => {
    if (accessToken) {
      navigate('/')
    }
  })
  const toggle = () => {
    setOpen(!open)
  }
  const isLoggedOut = useSelector(getIsLoggedOut)

  const isSessionOut = useSelector(getIsSessionOut)

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

  const msg = (
    <div className="message">
      <h5>User successfully created. Enter the password to proceed</h5>
    </div>
  )
  return (
    <>
      {autoFillEmail ? msg : <></>}
      <div className="outer-box">
        <div className="inner-box">
          {searchParams?.get('error') && (
            <span className="errorMsg">{AuthConstants.ERROR_SIGN_IN}</span>
          )}
          {isLoggedOut && !searchParams?.get('error') && !autoFillEmail && (
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
                  type={open === false ? 'password' : 'text'}
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
                {open === false ? (
                  <AiFillEyeInvisible onClick={toggle} />
                ) : (
                  <AiFillEye onClick={toggle} />
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
