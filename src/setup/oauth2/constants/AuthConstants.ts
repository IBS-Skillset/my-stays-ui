const HOST = `http://${process.env.DOMAIN}:${process.env.AUTH_SERVER_PORT}/auth-server`
export default {
  CLIENT_ID: 'client',
  SECRET_KEY: 'secret',
  REDIRECT_URI: 'http://127.0.0.1:3000/authorized',
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
