import axios from 'axios'
import { API_URL, getToken } from './auth.js'

const client = axios.create({ baseURL: API_URL + '/api' })

client.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default client


