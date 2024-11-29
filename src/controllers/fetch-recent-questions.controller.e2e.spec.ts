import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Fetch recent questions (E2E)', () => {
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
  test('[GET] /questions', async () => {
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
        {
          authorId: user.id,
          title: 'New question 2',
          slug: 'new-question-2',
          content: 'New content 2',
        },
        {
          authorId: user.id,
          title: 'New question 3',
          slug: 'new-question-3',
          content: 'New content 3',
        },
        {
          authorId: user.id,
          title: 'New question 4',
          slug: 'new-question-4',
          content: 'New content 4',
        },
      ],
    })
    const response = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()
    expect(response.statusCode).toBe(200)

    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({
          title: 'New question',
        }),
        expect.objectContaining({
          title: 'New question 2',
        }),
        expect.objectContaining({
          title: 'New question 3',
        }),
        expect.objectContaining({
          title: 'New question 4',
        }),
      ],
    })
  })
})
