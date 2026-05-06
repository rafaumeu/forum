import { describe, it, expect } from 'vitest'
import supertest from 'supertest'

import { app } from '@/infra/http/app'
import { createAndAuthenticateUser } from '../../../../../test/helper'

describe('Delete Question (E2E)', () => {
  it('should delete a question (auth + owner)', async () => {
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
      .delete(`/questions/${questionId}`)
      .set('Cookie', token)

    expect(response.status).toBe(204)
  })

  it('should not delete another users question', async () => {
    const { token: token1 } = await createAndAuthenticateUser()

    const questionResponse = await supertest(app.server)
      .post('/questions')
      .set('Cookie', token1)
      .send({
        title: 'How to test in Node.js?',
        content: 'I want to learn about testing in Node.js',
      })

    const questionId = questionResponse.body.question.id

    const { token: token2 } = await createAndAuthenticateUser()

    const response = await supertest(app.server)
      .delete(`/questions/${questionId}`)
      .set('Cookie', token2)

    expect(response.status).toBe(401)
  })
})
