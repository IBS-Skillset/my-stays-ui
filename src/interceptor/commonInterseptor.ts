import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loadingToggleAction } from '../actions/loaderAction'

export function useCommonInterseptor() {
  const dispatch = useDispatch()

  axios.interceptors.request.use(
    (config) => {
      dispatch(loadingToggleAction(true))
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
      return Promise.reject(error)
    },
  )
}
