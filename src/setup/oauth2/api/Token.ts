import { Buffer } from 'buffer'
import AuthConstants from '../constants/AuthConstants'

interface TokenParams {
  client_id: string
  redirect_uri: string
  grant_type: string
  code: string
  code_verifier: string
}
export function Token(code: string, verifier: string) {
  const tokenUrl = new URL(AuthConstants.TOKEN_URL)
  const client = AuthConstants.CLIENT_ID
  const secret = AuthConstants.SECRET_KEY
  const queryParams: TokenParams = {
    client_id: client,
    redirect_uri: AuthConstants.REDIRECT_URI,
    grant_type: 'authorization_code',
    code: code,
    code_verifier: verifier,
  }
  for (const param in queryParams) {
    tokenUrl.searchParams.append(param, queryParams[param as keyof TokenParams])
  }
  const headers = new Headers()
  headers.append('Content-type', 'application/json')
  headers.append(
    'Authorization',
    `Basic ${Buffer.from(`${client}:${secret}`).toString('base64')}`,
  )
  const response = fetch(tokenUrl, {
    method: 'POST',
    mode: 'cors',
    headers,
  })
  return response
}
