let HOST = (window as any).AUTH_SERVER_URI + '/auth-server'
let HOST_UI = (window as any).HOST_UI
if (process.env.NODE_ENV === 'development') {
  HOST = `${process.env.AUTH_SERVER_URI}/auth-server`
}
export default {
  CLIENT_ID: 'client',
  SECRET_KEY: 'secret',
  REDIRECT_URI: 'http://${HOST_UI}:80/authorized',
  AUTHORIZE_URL: `${HOST}/oauth2/authorize?`,
  TOKEN_URL: `${HOST}/oauth2/token?`,
  LOGIN_URL: `${HOST}/perform_login?`,
  REVOKE_URL: `${HOST}/oauth2/revoke?`,
  LOGOUT_URL: `${HOST}/perform_logout?`,
  ERROR_SIGN_IN: 'Invalid Credentials. Please Sign in again!',
  LOGOUT_MESSAGE: 'User logout. Please Sign in again!',
  SESSION_OUT_MESSAGE: 'Session has expired. Please Sign in again!',
  PERSIST_ERROR: 'Account already exists! Please sign in',
  ACCOUNT_SERVICE_ERROR: 'Unable to create account! Please try again later',
  USER_DETAILS_ERROR: 'Unable to fetch details! Please try again later',
}
