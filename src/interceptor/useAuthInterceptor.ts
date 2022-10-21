import axios from 'axios'
import RefreshToken from '../setup/oauth2/api/RefreshToken'
import { useDispatch } from 'react-redux'
import { tokenAction } from '../actions/tokenAction'

const useAuthInterceptor = (accessToken: string, refreshToken: string) => {
  const dispatch = useDispatch()
  if (accessToken) {
    axios.interceptors.request.use(
      (config) => {
        config.headers!.Authorization = `Bearer ${accessToken}`
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
      function (error) {
        const originalRequest = error.config

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          return RefreshToken.getAccessToken(refreshToken).then(
            async (response) => {
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
            },
          )
        }
        return Promise.reject(error)
      },
    )
  }
}

export default useAuthInterceptor
