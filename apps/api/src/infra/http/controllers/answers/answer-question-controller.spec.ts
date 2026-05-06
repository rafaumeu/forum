import { describe, it, expect } from 'vitest'
import supertest from 'supertest'

import { app } from '@/infra/http/app'
import { createAndAuthenticateUser } from '../../../../../test/helper'

describe('Answer Question (E2E)', () => {
  it('should answer a question (auth)', async () => {
    const { token } = await createAndAuthenticateUser()

    const questionResponse = await supertest(app.server)
      .post('/questions')
      .set('Cookie', token)
      .send({
        title: 'How to test in Node.js?',
        content: 'I want to learn about testing in Node.js',
      })

    const questionId = questionResponse.body.question.id

    const response = await supertest(app.server)
      .post(`/questions/${questionId}/answers`)
      .set('Cookie', token)
      .send({
        content: 'You can use vitest for testing in Node.js',
      })

    expect(response.status).toBe(201)
    expect(response.body.answer).toHaveProperty('id')
  })
})
