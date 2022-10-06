import AuthConstants from '../constants/AuthConstants'

interface AuthorizeParams {
  response_type: string
  client_id: string
  scope: string
  redirect_uri: string
  state: string
  code_challenge: string
  code_challenge_method: string
}
export function Authorize(state: string, codeChallenge: string) {
  const authorizeUrl = new URL(AuthConstants.AUTHORIZE_URL)
  const queryParams: AuthorizeParams = {
    response_type: 'code',
    client_id: AuthConstants.CLIENT_ID,
    scope: 'openid',
    redirect_uri: AuthConstants.REDIRECT_URI,
    state: state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  }
  for (const param in queryParams) {
    authorizeUrl.searchParams.append(
      param,
      queryParams[param as keyof AuthorizeParams],
    )
  }
  return authorizeUrl.href
}
