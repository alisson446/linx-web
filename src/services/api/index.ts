import axios from "axios"
import { getToken } from "../../cookies"

const apiLinx = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_LINX
})

// Interceptors
apiLinx.interceptors.request.use((config) => {
  const accessToken = getToken()

  if (accessToken) {
    config.headers.Authorization = accessToken
    config.headers["ngrok-skip-browser-warning"] = "true"
  }
  return config
})

export {
  apiLinx
}
