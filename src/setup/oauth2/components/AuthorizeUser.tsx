import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Authorize } from '../api/Authorize'
import { Token } from '../api/Token'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../store/reducers/rootReducer'
import { tokenAction } from '../../../store/actions/tokenAction'

const AuthorizeUser = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const authState = useSelector((state: IRootState) => state.pkce.authState)
  const verifier = useSelector((state: IRootState) => state.pkce.codeVerifier)
  const isAuthorized = useSelector(
    (state: IRootState) => state.authorize.isAuthorized,
  )

  const codeChallenge = useSelector(
    (state: IRootState) => state.pkce.codeChallenge,
  )

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
