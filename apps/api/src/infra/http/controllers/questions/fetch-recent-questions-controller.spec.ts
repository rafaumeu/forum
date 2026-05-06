import { describe, it, expect } from 'vitest'
import supertest from 'supertest'

import { app } from '@/infra/http/app'
import { createAndAuthenticateUser } from '../../../../../test/helper'

describe('Fetch Recent Questions (E2E)', () => {
  it('should fetch recent questions', async () => {
    const { token } = await createAndAuthenticateUser()

    await supertest(app.server)
      .post('/questions')
      .set('Cookie', token)
      .send({
        title: 'Question 1',
        content: 'Content 1',
      })

    await supertest(app.server)
      .post('/questions')
      .set('Cookie', token)
      .send({
        title: 'Question 2',
        content: 'Content 2',
      })

    await supertest(app.server)
      .post('/questions')
      .set('Cookie', token)
      .send({
        title: 'Question 3',
        content: 'Content 3',
      })

    const response = await supertest(app.server).get('/questions?page=1')

    expect(response.status).toBe(200)
    expect(response.body.questions).toHaveLength(3)
  })
})
