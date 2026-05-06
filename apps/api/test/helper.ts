import { afterAll, afterEach, beforeAll } from 'vitest'
import supertest from 'supertest'

import { app } from '../src/infra/http/app'
import { prisma } from '../src/infra/database/prisma-service'

export { app }

export async function createAndAuthenticateUser() {
  const email = `test-${Date.now()}@example.com`

  const registerResponse = await supertest(app.server)
    .post('/register')
    .send({
      name: 'Test User',
      email,
      password: '123456',
    })

  const userId = registerResponse.body.user.id

  const authResponse = await supertest(app.server)
    .post('/sessions')
    .send({
      email,
      password: '123456',
    })

  const token = authResponse.headers['set-cookie']

  return { token, userId }
}

beforeAll(async () => {
  await app.ready()
})

afterEach(async () => {
  await prisma.$executeRawUnsafe(
    'TRUNCATE TABLE answer_comments, question_comments, answer_attachments, question_attachments, answers, question_tags, questions, notifications, attachments, users CASCADE',
  )
})

afterAll(async () => {
  await prisma.$disconnect()
})
