import { describe, it, expect } from 'vitest'
import supertest from 'supertest'

import { app } from '@/infra/http/app'
import { createAndAuthenticateUser } from '../../../../../test/helper'

describe('Search Questions (E2E)', () => {
  it('should search questions by keyword', async () => {
    const { token } = await createAndAuthenticateUser()

    await supertest(app.server)
      .post('/questions')
      .set('Cookie', token)
      .send({
        title: 'How to test in Node.js?',
        content: 'I want to learn about testing in Node.js',
      })

    await supertest(app.server)
      .post('/questions')
      .set('Cookie', token)
      .send({
        title: 'How to learn Python?',
        content: 'I want to learn Python programming',
      })

    const response = await supertest(app.server)
      .get('/questions/search')
      .query({ q: 'Node' })

    expect(response.status).toBe(200)
    expect(response.body.questions).toHaveLength(1)
    expect(response.body.questions[0].title).toContain('Node.js')
  })
})
