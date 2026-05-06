import { describe, it, expect } from 'vitest'
import supertest from 'supertest'

import { app } from '@/infra/http/app'
import { createAndAuthenticateUser } from '../../../../../test/helper'

describe('Fetch Question Comments (E2E)', () => {
  it('should fetch comments for a question', async () => {
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
      .post(`/questions/${questionId}/comments`)
      .set('Cookie', token)
      .send({
        content: 'First comment on this question',
      })

    await supertest(app.server)
      .post(`/questions/${questionId}/comments`)
      .set('Cookie', token)
      .send({
        content: 'Second comment on this question',
      })

    const response = await supertest(app.server)
      .get(`/questions/${questionId}/comments`)

    expect(response.status).toBe(200)
    expect(response.body.questionComments).toHaveLength(2)
  })
})
