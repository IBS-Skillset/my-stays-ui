import React from 'react'
import { useNavigate } from 'react-router'
import './ErrorPage.scss'

function ErrorPage() {
  const navigate = useNavigate()
  return (
    <>
      <div className="main-box">
        <div className="error-title">404 ERROR</div>
        <div>
          Oops! Looks like you took a wrong turn
        </div>
        <button onClick={() => navigate('/')} className="error-btn">
          Go back
        </button>
      </div>
    </>
  )
}
export default ErrorPage
