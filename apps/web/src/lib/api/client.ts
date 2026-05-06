import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333',
  withCredentials: true,
})

export const customInstance = async <T>(
  config: AxiosRequestConfig
): Promise<T> => {
  const response = await api(config)
  return response.data
}
