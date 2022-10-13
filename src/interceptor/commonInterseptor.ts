import axios, { AxiosRequestConfig } from 'axios'
import { useDispatch } from 'react-redux'
import { loadingToggleAction } from '../actions/loaderAction'

export function useCommonInterseptor() {
  const dispatch = useDispatch()

  const falseLoadingUrls = (config: AxiosRequestConfig<any>): boolean => {
    const HOTEL_DESCRIPTION_URL = `http://${process.env.DOMAIN}:${process.env.HOTEL_SERVICE_PORT}/hotel-search-service/api/description`
    return config.url === HOTEL_DESCRIPTION_URL && config.method == 'post'
  }

  axios.interceptors.request.use(
    (config) => {
      if (config.method == 'get') {
        dispatch(loadingToggleAction(true, false))
        return config
      }
      if (falseLoadingUrls(config)) {
        dispatch(loadingToggleAction(true, false))
        return config
      }
      dispatch(loadingToggleAction(true, true))
      return config
    },
    (error) => {
      Promise.reject(error)
    },
  )
  axios.interceptors.response.use(
    (response) => {
      dispatch(loadingToggleAction(false, false))
      return response
    },
    function (error) {
      dispatch(loadingToggleAction(false, false))
      return Promise.reject(error)
    },
  )
}
