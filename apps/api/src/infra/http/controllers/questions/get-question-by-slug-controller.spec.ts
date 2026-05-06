import { describe, it, expect } from 'vitest'
import supertest from 'supertest'

import { app } from '@/infra/http/app'
import { createAndAuthenticateUser } from '../../../../../test/helper'

describe('Get Question By Slug (E2E)', () => {
  it('should get question by slug', async () => {
    const { token } = await createAndAuthenticateUser()

    await supertest(app.server)
      .post('/questions')
      .set('Cookie', token)
      .send({
        title: 'How to test in Node.js?',
        content: 'I want to learn about testing in Node.js',
      })

    const response = await supertest(app.server).get(
      '/questions/how-to-test-in-nodejs',
    )

    expect(response.status).toBe(200)
    expect(response.body.question.title).toBe('How to test in Node.js?')
  })
})
