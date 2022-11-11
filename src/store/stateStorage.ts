export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = (state: {
  pkce: { authState: string; codeVerifier: string; codeChallenge: string }
  token: { accessToken: string; refreshToken: string; expires: number }
  authorize: { isAuthorized: boolean }
  logout: { isLoggedOut: boolean }
  sessionOut: { isSessionOut: boolean }
}) => {
  try {
    const serializedState = JSON.stringify(state)
    sessionStorage.setItem('state', serializedState)
  } catch (err) {
    // Ignore write errors.
  }
}

export const clearState = () => {
  sessionStorage.removeItem('state')
}

export const getRefreshToken = () => {
  const serializedState = sessionStorage.getItem('state')
  if (serializedState === null) {
    return undefined
  }
  return JSON.parse(serializedState).token.refreshToken
}

export const getAccessToken = () => {
  const serializedState = sessionStorage.getItem('state')
  if (serializedState === null) {
    return undefined
  }
  return JSON.parse(serializedState).token.accessToken
}
