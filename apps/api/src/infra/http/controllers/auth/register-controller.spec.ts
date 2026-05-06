import { describe, it, expect } from 'vitest'
import supertest from 'supertest'

import { app } from '@/infra/http/app'

describe('Register (E2E)', () => {
  it('should register a new user', async () => {
    const response = await supertest(app.server).post('/register').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.status).toBe(201)
    expect(response.body.user).toHaveProperty('id')
    expect(response.body.user.email).toBe('johndoe@example.com')
  })

  it('should not register with duplicate email', async () => {
    await supertest(app.server).post('/register').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const response = await supertest(app.server).post('/register').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.status).toBe(409)
  })

  it('should not register with invalid email', async () => {
    const response = await supertest(app.server).post('/register').send({
      name: 'John Doe',
      email: 'invalid-email',
      password: '123456',
    })

    expect(response.status).toBe(400)
  })

  it('should not register with short password', async () => {
    const response = await supertest(app.server).post('/register').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345',
    })

    expect(response.status).toBe(400)
  })
})
