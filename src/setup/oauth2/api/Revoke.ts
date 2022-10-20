import AuthConstants from '../constants/AuthConstants'
import { Buffer } from 'buffer'

export function Revoke(accessToken: string, refreshToken: string) {
  const revokeUrl = new URL(AuthConstants.REVOKE_URL)
  const client = AuthConstants.CLIENT_ID
  const secret = AuthConstants.SECRET_KEY
  revokeUrl.searchParams.append('token', refreshToken)
  const headers = new Headers()
  headers.append('Content-type', 'application/json')
  headers.append(
    'Authorization',
    `Basic ${Buffer.from(`${client}:${secret}`).toString('base64')}`,
  )
  const response = fetch(revokeUrl, {
    method: 'POST',
    mode: 'cors',
    headers,
  })
  return response
}
