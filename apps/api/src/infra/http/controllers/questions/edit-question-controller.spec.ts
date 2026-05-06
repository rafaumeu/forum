import { describe, it, expect } from 'vitest'
import supertest from 'supertest'

import { app } from '@/infra/http/app'
import { createAndAuthenticateUser } from '../../../../../test/helper'

describe('Edit Question (E2E)', () => {
  it('should edit a question (auth + owner)', async () => {
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
      .put(`/questions/${questionId}`)
      .set('Cookie', token)
      .send({
        title: 'Updated title',
        content: 'Updated content',
      })

    expect(response.status).toBe(200)
    expect(response.body.question.title).toBe('Updated title')
    expect(response.body.question.content).toBe('Updated content')
  })

  it('should not edit another users question', async () => {
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
      .put(`/questions/${questionId}`)
      .set('Cookie', token2)
      .send({
        title: 'Hacked title',
        content: 'Hacked content',
      })

    expect(response.status).toBe(401)
  })
})
