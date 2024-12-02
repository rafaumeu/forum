import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Get question by slug (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)
    await app.init()
  })
  test('[GET] /questions/:slug', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'fWl8o@example.com',
        password: '123456',
      },
    })
    const accessToken = jwt.sign({ sub: user.id })
    await prisma.question.createMany({
      data: [
        {
          authorId: user.id,
          title: 'New question',
          slug: 'new-question',
          content: 'New content',
        },
      ],
    })
    const response = await request(app.getHttpServer())
      .get('/questions/new-question')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()
    expect(response.statusCode).toBe(200)

    expect(response.body).toEqual({
      questions: expect.objectContaining({
        title: 'New question',
      }),
    })
  })
})
