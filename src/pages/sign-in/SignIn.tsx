import React, { useEffect, useState } from 'react'

import './Signin.scss'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IRootState } from '../../reducers/rootReducer'

function SignIn() {
  const [open, setOpen] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const autoFillEmail = useSelector(
    (state: IRootState) => state.signup.autoFillEmail,
  )
  useEffect(() => {
    setEmail(autoFillEmail)
  }, [autoFillEmail])

  const toggle = () => {
    setOpen(!open)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(email)
    console.log(password)
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
          <h2 className="signin-heading">Sign in</h2>
          <div>
            <form onSubmit={handleSubmit} className=" relative">
              <div className="mb-6">
                <input
                  type="email"
                  required
                  id="username"
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
