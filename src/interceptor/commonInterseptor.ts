import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loadingToggleAction } from '../actions/loaderAction'

export function useCommonInterseptor() {
  const dispatch = useDispatch()

  axios.interceptors.request.use(
    (config) => {
      config.method != 'get' && dispatch(loadingToggleAction(true))
      return config
    },
    (error) => {
      Promise.reject(error)
    },
  )
  axios.interceptors.response.use(
    (response) => {
      dispatch(loadingToggleAction(false))
      return response
    },
    function (error) {
      dispatch(loadingToggleAction(false))
      return Promise.reject(error)
    },
  )
}
