import axios from 'axios'
import { useDispatch } from 'react-redux'
import { tokenAction } from '../actions/tokenAction'
import RefreshToken from '../setup/oauth2/api/RefreshToken'
import { getAccessToken, getRefreshToken } from '../stateStorage'

const useAuthInterceptor = () => {
  const dispatch = useDispatch()
  axios.interceptors.request.use(
    (config) => {
      const accessToken = getAccessToken()
      if (accessToken) {
        config.headers!.Authorization = `Bearer ${accessToken}`
      }
      return config
    },
    (error) => {
      Promise.reject(error)
    },
  )
  axios.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      const originalRequest = error.config

      if (error.response.status === 401 && !originalRequest.retry) {
        originalRequest.retry = true
        const refreshToken = getRefreshToken()
        return RefreshToken.getAccessToken(refreshToken)
          .then(async (response) => {
            const token = await response.json()
            dispatch(
              tokenAction(
                token.access_token,
                token.refresh_token,
                token.expires_in,
              ),
            )
            axios.defaults.headers.common['Authorization'] =
              'Bearer ' + token.access_token
            return axios(originalRequest)
          })
          .catch(() => {
            window.location.replace('/logout')
          })
      }
      return Promise.reject(error)
    },
  )
}

export default useAuthInterceptor
