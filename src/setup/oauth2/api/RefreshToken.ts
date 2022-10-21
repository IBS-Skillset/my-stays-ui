import AuthConstants from '../constants/AuthConstants'
import { Buffer } from 'buffer'

interface TokenParams {
  client_id: string
  grant_type: string
  refresh_token: string
}

class RefreshToken {
  getAccessToken(refreshToken: string) {
    const tokenUrl = new URL(AuthConstants.TOKEN_URL)
    const client = AuthConstants.CLIENT_ID
    const secret = AuthConstants.SECRET_KEY
    const queryParams: TokenParams = {
      client_id: client,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }
    for (const param in queryParams) {
      tokenUrl.searchParams.append(
        param,
        queryParams[param as keyof TokenParams],
      )
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
}
export default new RefreshToken()
