import React, { useState } from 'react'

import './Signin.scss'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link } from 'react-router-dom'

function SignIn() {
  const [open, setOpen] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const toggle = () => {
    setOpen(!open)
  }

  sessionStorage.setItem('signed_in', 'signin')

  /*const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault()
    console.log(email)
    console.log(password)
    const data = new FormData(e.currentTarget)
    const inputs = {
      username: email,
      password: password,
    }
    /!*fetch('http://localhost:9000/auth-server/perform_login', {
      method: 'POST',
      body: new URLSearchParams(data as any),
    })
      .then((v) => {
        if (v.redirected) window.location = v.url
      })
      .catch((e) => console.warn(e))*!/
    axios.post('http://localhost:9000/auth-server/perform_login', inputs, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
/!*    PostData('perform_login', inputs).then((result) => {
      console.log(result)
    })*!/
    /!*    axios({
          method:'post',
          url:'//fooLogin',
          params:{
            username: email,
            password: password
          },
          config: { headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        })
            .then(
        //authentication success...
      })
    .catch(error=>{
        var errResp = error.response;
        if(errResp.status === 401){
          //Ex: show login page again...
        }
    
      })*!/
  }*/
  return (
    <>
      <div className="outer-box">
        <div className="inner-box">
          <h2 className="signin-heading">Sign in</h2>
          <div>
            <form
              action="http://localhost:9000/auth-server/testlogin"
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
              Don&sbquo;t have an account?
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
