import axios, { AxiosRequestConfig } from 'axios'
import { useDispatch } from 'react-redux'
import { loadingToggleAction } from '../store/actions/loaderAction'
import APIConstants from '../services/constants/APIConstants'

export function useCommonInterseptor() {
  const dispatch = useDispatch()

  const falseLoadingUrls = (config: AxiosRequestConfig<any>): boolean => {
    return (
      (config.url === APIConstants.HOTEL_DESCRIPTION_URL ||
        config.url === APIConstants.HOTEL_ROOM_AVAILABILITY_URL) &&
      config.method == 'post'
    )
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
