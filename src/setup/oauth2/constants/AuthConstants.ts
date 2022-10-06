const HOST = `http://${process.env.DOMAIN}:${process.env.AUTH_SERVER_PORT}/auth-server`
export default {
  CLIENT_ID: 'client',
  SECRET_KEY: 'secret',
  REDIRECT_URI: 'http://127.0.0.1:3000/authorized',
  AUTHORIZE_URL: `${HOST}/oauth2/authorize?`,
  TOKEN_URL: `${HOST}/oauth2/token?`,
  LOGIN_URL: `${HOST}/perform_login?`,
}
