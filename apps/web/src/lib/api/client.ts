import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333',
  withCredentials: true,
})

export const customInstance = async <T>(config: {
  url: string
  method: string
  data?: unknown
  params?: unknown
}): Promise<T> => {
  const response = await api({
    url: config.url,
    method: config.method,
    data: config.data,
    params: config.params,
  })
  return response.data
}
