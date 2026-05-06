import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { CreateQuestionUseCase } from '@forum/domain/src/domain/forum/application/use-cases/create-question'
import { PrismaQuestionsRepository } from '@/infra/database/repositories/prisma-questions-repository'

export function createQuestionController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/questions',
    {
      onRequest: [app.authenticate],
      schema: {
        tags: ['Questions'],
        summary: 'Create a new question',
        security: [{ cookieAuth: [] }],
        body: z.object({
          title: z.string(),
          content: z.string(),
          attachmentsIds: z.array(z.string()).optional(),
        }),
        response: {
          201: z.object({
            question: z.object({
              id: z.string(),
              title: z.string(),
              content: z.string(),
              slug: z.string(),
              authorId: z.string(),
              createdAt: z.date(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { title, content, attachmentsIds } = request.body
      const authorId = request.user.sub

      const questionsRepository = new PrismaQuestionsRepository()
      const createQuestionUseCase = new CreateQuestionUseCase(questionsRepository)

      const result = await createQuestionUseCase.execute({
        authorId,
        title,
        content,
        attachmentsIds: attachmentsIds ?? [],
      })

      if (result.isLeft()) {
        return reply.status(400).send({ message: result.value })
      }

      const { question } = result.value

      return reply.status(201).send({
        question: {
          id: question.id.toString(),
          title: question.title,
          content: question.content,
          slug: question.slug.value,
          authorId: question.authorId.toString(),
          createdAt: question.createdAt,
        },
      })
    },
  )
}
