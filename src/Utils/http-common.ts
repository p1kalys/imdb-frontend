import axios from "axios"
import { store } from "../store/store"
import { setLoading, setIdle } from "../store/slice/loadingIndicatorSilce"
import {
  handleSuccessPopupMessage,
  handleErrorPopupMessage,
} from "./popupMessage"

const instance = axios.create({
  baseURL: "https://imdb-backend-iqj9.onrender.com",
  headers: {
    "Content-type": "application/json",
  },
})

instance.interceptors.request.use((config) => {
  store.dispatch(setLoading())
  return config
})

instance.interceptors.response.use(
  (response) => {
    handleSuccessPopupMessage(response)
    store.dispatch(setIdle())
    return response
  },
  (error) => {
    handleErrorPopupMessage(error)
    store.dispatch(setIdle())
    return Promise.reject(error)
  }
)

export default instance
