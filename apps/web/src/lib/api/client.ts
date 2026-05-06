import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

const isMock = process.env.NEXT_PUBLIC_MOCK_API === 'true'

export const api = axios.create({
  baseURL: isMock ? '' : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'),
  withCredentials: true,
})

if (isMock) {
  api.interceptors.request.use(async (config) => {
    const { getMockQuestions, getMockPopularQuestions, getMockQuestionBySlug, getMockSearchQuestions } = await import('./mock-responses')
    const url = config.url || ''

    await new Promise(r => setTimeout(r, 150))

    let mockData: any = null
    let mockStatus = 200

    // Answers endpoint: /questions/:id/answers
    const answersMatch = url.match(/^\/questions\/([^/]+)\/answers$/)
    if (answersMatch) {
      const { getMockQuestionBySlug } = await import('./mock-responses')
      const result = getMockQuestionBySlug(answersMatch[1])
      mockData = result
        ? { answers: result.answers, total: result.answers.length }
        : { answers: [], total: 0 }
    }
    // Popular questions
    else if (url === '/questions/popular') {
      mockData = { questions: getMockPopularQuestions() }
    }
    // Search questions
    else if (url === '/questions/search') {
      const query = config.params?.q || ''
      mockData = getMockSearchQuestions(query)
    }
    // Questions list
    else if (url === '/questions') {
      const page = Number(config.params?.page) || 1
      mockData = getMockQuestions(page)
    }
    // Question detail by slug
    else if (url.startsWith('/questions/')) {
      const slug = url.replace('/questions/', '')
      const result = getMockQuestionBySlug(slug)
      if (result) {
        mockData = result
      } else {
        mockData = { error: 'Not found' }
        mockStatus = 404
      }
    }
    // Post answer
    else if (url.match(/^\/questions\/([^/]+)\/answers$/) && config.method === 'post') {
      mockData = { message: 'Answer created' }
    }
    // Mark best answer
    else if (url.match(/^\/answers\/([^/]+)\/best$/)) {
      mockData = { message: 'Marked as best' }
    }
    // Auth endpoints
    else if (url.includes('register')) {
      mockData = { message: 'User registered successfully' }
    } else if (url.includes('authenticate') || url.includes('login')) {
      mockData = { token: 'mock-jwt-token' }
    } else if (url.includes('profile') || url.includes('/me')) {
      mockData = { user: { id: 'user-5', name: 'Rafael Zendron', email: 'rafael@forum.com', role: 'ADMIN' } }
    }

    const mockError: any = new Error('Mock response')
    mockError.isMock = true
    mockError.mockData = mockData
    mockError.mockStatus = mockStatus
    throw mockError
  })
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.isMock) {
      const status = error.mockStatus || 200
      if (status >= 400) {
        return Promise.reject({ response: { status, data: error.mockData } })
      }
      return Promise.resolve({
        data: error.mockData,
        status,
        statusText: 'OK',
        headers: {},
        config: error.config,
      })
    }
    return Promise.reject(error)
  }
)

export const customInstance = async <T>(
  config: AxiosRequestConfig
): Promise<T> => {
  const response = await api(config)
  return response.data
}
