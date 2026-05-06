import { describe, it, expect } from 'vitest'
import supertest from 'supertest'

import { app } from '@/infra/http/app'
import { createAndAuthenticateUser } from '../../../../../test/helper'

describe('Fetch Question Answers (E2E)', () => {
  it('should fetch answers for a question', async () => {
    const { token } = await createAndAuthenticateUser()

    const questionResponse = await supertest(app.server)
      .post('/questions')
      .set('Cookie', token)
      .send({
        title: 'How to test in Node.js?',
        content: 'I want to learn about testing in Node.js',
      })

    const questionId = questionResponse.body.question.id

    await supertest(app.server)
      .post(`/questions/${questionId}/answers`)
      .set('Cookie', token)
      .send({
        content: 'You can use vitest for testing',
      })

    await supertest(app.server)
      .post(`/questions/${questionId}/answers`)
      .set('Cookie', token)
      .send({
        content: 'You can also use jest for testing',
      })

    const response = await supertest(app.server)
      .get(`/questions/${questionId}/answers`)

    expect(response.status).toBe(200)
    expect(response.body.answers).toHaveLength(2)
  })
})
