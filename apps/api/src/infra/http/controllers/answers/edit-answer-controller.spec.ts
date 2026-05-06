import { describe, it, expect } from 'vitest'
import supertest from 'supertest'

import { app } from '@/infra/http/app'
import { createAndAuthenticateUser } from '../../../../../test/helper'

describe('Edit Answer (E2E)', () => {
  it('should edit an answer (auth + owner)', async () => {
    const { token } = await createAndAuthenticateUser()

    const questionResponse = await supertest(app.server)
      .post('/questions')
      .set('Cookie', token)
      .send({
        title: 'How to test in Node.js?',
        content: 'I want to learn about testing in Node.js',
      })

    const questionId = questionResponse.body.question.id

    const answerResponse = await supertest(app.server)
      .post(`/questions/${questionId}/answers`)
      .set('Cookie', token)
      .send({
        content: 'You can use vitest for testing',
      })

    const answerId = answerResponse.body.answer.id

    const response = await supertest(app.server)
      .put(`/answers/${answerId}`)
      .set('Cookie', token)
      .send({
        content: 'Updated answer content',
      })

    expect(response.status).toBe(200)
    expect(response.body.answer.content).toBe('Updated answer content')
  })
})
