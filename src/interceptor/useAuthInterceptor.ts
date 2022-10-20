import axios from 'axios'

const useAuthInterceptor = (accessToken: string) => {
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
  }
}

export default useAuthInterceptor
