import { describe, it, expect } from 'vitest'
import supertest from 'supertest'

import { app } from '@/infra/http/app'
import { createAndAuthenticateUser } from '../../../../../test/helper'

describe('Create Question (E2E)', () => {
  it('should create a question (auth)', async () => {
    const { token } = await createAndAuthenticateUser()

    const response = await supertest(app.server)
      .post('/questions')
      .set('Cookie', token)
      .send({
        title: 'How to test in Node.js?',
        content: 'I want to learn about testing in Node.js',
      })

    expect(response.status).toBe(201)
    expect(response.body.question).toHaveProperty('id')
  })

  it('should not create question without auth', async () => {
    const response = await supertest(app.server).post('/questions').send({
      title: 'How to test in Node.js?',
      content: 'I want to learn about testing in Node.js',
    })

    expect(response.status).toBe(401)
  })
})
