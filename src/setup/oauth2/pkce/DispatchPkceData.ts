import { useDispatch } from 'react-redux'
import {
  generateCodeChallenge,
  generateCodeVerifier,
  generateState,
} from './pkce'
import {
  codeChallengeAction,
  codeVerifierAction,
  stateAction,
} from '../../../actions/pkceAction'
import { signInAction } from '../../../actions/signInAction'

const DispatchPkceData = () => {
  localStorage.clear()
  const dispatch = useDispatch()

  const authState = generateState()
  const verifier = generateCodeVerifier()
  const codeChallenge = generateCodeChallenge(verifier)

  dispatch(stateAction(authState))
  dispatch(codeVerifierAction(verifier))
  dispatch(codeChallengeAction(codeChallenge))
  dispatch(signInAction(true))
}

export default DispatchPkceData
