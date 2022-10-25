import React, { useEffect, useState } from 'react'

import './Signin.scss'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import AuthConstants from '../../setup/oauth2/constants/AuthConstants'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../reducers/rootReducer'
import { userLogOutAction } from '../../actions/logoutAction'

function SignIn() {
  const [open, setOpen] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const autoFillEmail = useSelector(
    (state: IRootState) => state.signup.autoFillEmail,
  )
  const accessToken = useSelector(
    (state: IRootState) => state.token.accessToken,
  )
  const navigate = useNavigate()
  useEffect(() => {
    setEmail(autoFillEmail)
  }, [autoFillEmail])

  useEffect(() => {
    if (accessToken) {
      navigate('/')
    }
  })
  const toggle = () => {
    setOpen(!open)
  }
  const isLoggedOut = useSelector(
    (state: IRootState) => state.logout.isLoggedOut,
  )

  if (isLoggedOut) {
    setTimeout(() => {
      dispatch(userLogOutAction(false))
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
          <h2 className="signin-heading">Sign in</h2>
          <div>
            <form
              action={`${AuthConstants.LOGIN_URL}`}
              method="post"
              className=" relative"
            >
              <div className="mb-6">
                <input
                  type="email"
                  required
                  id="username"
                  name="username"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  value={email}
                  className="input-box"
                  placeholder="Email address"
                />
              </div>
              <div className="mb-6 ">
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
              <button type="submit" className="btn-submit bg-blue-700">
                Sign in
              </button>
            </form>
            <p className=" p-4 text-center select-none">
              Don&apos;t have an account?
              <Link to="/signup" className="text-blue-800">
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
