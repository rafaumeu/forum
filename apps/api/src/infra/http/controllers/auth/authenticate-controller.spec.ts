import { describe, it, expect } from 'vitest'
import supertest from 'supertest'

import { app } from '@/infra/http/app'

describe('Authenticate (E2E)', () => {
  it('should authenticate with valid credentials', async () => {
    await supertest(app.server).post('/register').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const response = await supertest(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.status).toBe(200)
    expect(response.headers['set-cookie']).toBeDefined()
    expect(response.headers['set-cookie'][0]).toContain('access_token')
  })

  it('should not authenticate with wrong password', async () => {
    await supertest(app.server).post('/register').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const response = await supertest(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: 'wrong-password',
    })

    expect(response.status).toBe(401)
  })
})
