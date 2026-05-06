import { describe, it, expect } from 'vitest'
import supertest from 'supertest'

import { app } from '@/infra/http/app'
import { createAndAuthenticateUser } from '../../../../../test/helper'

describe('Comment on Question (E2E)', () => {
  it('should comment on a question (auth)', async () => {
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
      .post(`/questions/${questionId}/comments`)
      .set('Cookie', token)
      .send({
        content: 'Great question! I would like to know too.',
      })

    expect(response.status).toBe(201)
    expect(response.body.questionComment).toHaveProperty('id')
    expect(response.body.questionComment.content).toBe('Great question! I would like to know too.')
  })
})
