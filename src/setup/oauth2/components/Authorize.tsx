import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Buffer } from 'buffer'

interface AuthorizeProps {
  setToken?: any
  link?: string
}

const Authorize = (props: AuthorizeProps) => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (
      searchParams?.get('code') &&
      searchParams?.get('state') == 'testState'
    ) {
      const code = searchParams?.get('code')
      const client = 'client'
      const secret = 'secret'
      const headers = new Headers()
      headers.append('Content-type', 'application/json')
      headers.append(
        'Authorization',
        `Basic ${Buffer.from(`${client}:${secret}`).toString('base64')}`,
      )

      const verifier = sessionStorage.getItem('codeVerifier')
      const initialUrl =
        'http://localhost:9000/auth-server/oauth2/token?client_id=client&redirect_uri=http://127.0.0.1:3000/authorized&grant_type=authorization_code'
      const url = `${initialUrl}&code=${code}&code_verifier=${verifier}`
      console.log('.....................token execution')
      fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers,
      })
        .then(async (response) => {
          const token = await response.json()
          if (token?.id_token) {
            sessionStorage.setItem('access_token', token.access_token)
            sessionStorage.setItem('refresh_token', token.refresh_token)
            props.setToken(token.access_token)
            navigate('/')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])
  useEffect(() => {
    if (!searchParams?.get('code')) {
      const codeChallenge = sessionStorage.getItem('codeChallenge')
      const state = 'testState'
      sessionStorage.setItem('state', state)
      const link = `http://localhost:9000/auth-server/oauth2/authorize?response_type=code&client_id=client&scope=openid&redirect_uri=http://127.0.0.1:3000/authorized&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`
      window.location.href = link
    }
  }, [])
  return <></>
}

export default Authorize
