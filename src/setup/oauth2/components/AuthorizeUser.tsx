import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { tokenAction } from '../../../store/actions/tokenAction'
import {
  getAuthState,
  getCodeChallenge,
  getIsAuthorized,
  getVerifier,
} from '../../../store/selectors/Selectors'
import { Authorize } from '../api/Authorize'
import { Token } from '../api/Token'

const AuthorizeUser = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const authState = useSelector(getAuthState)
  const verifier = useSelector(getVerifier)
  const isAuthorized = useSelector(getIsAuthorized)
  const codeChallenge = useSelector(getCodeChallenge)

  useEffect(() => {
    if (
      searchParams?.get('code') &&
      searchParams?.get('state') == authState &&
      isAuthorized
    ) {
      const code = searchParams?.get('code') || ''
      console.log('.....................token execution')
      Token(code, verifier)
        .then(async (response) => {
          const token = await response.json()
          if (token?.id_token) {
            dispatch(
              tokenAction(
                token.access_token,
                token.refresh_token,
                token.expires_in,
              ),
            )
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
      const link = Authorize(authState, codeChallenge)
      window.location.href = link
    }
  }, [])
  return <></>
}

export default AuthorizeUser
