import { AuthAction } from '../actionModels/auth'

export function codeVerifierAction(codeVerifier: string): AuthAction {
  return {
    type: 'CODE_VERIFIER',
    payload: codeVerifier,
  }
}

export function codeChallengeAction(codeChallenge: string): AuthAction {
  return {
    type: 'CODE_CHALLENGE',
    payload: codeChallenge,
  }
}

export function stateAction(authState: string): AuthAction {
  return {
    type: 'AUTH_STATE',
    payload: authState,
  }
}
