import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { GetQuestionBySlugUseCase } from '@forum/domain/src/domain/forum/application/use-cases/get-question-by-slug'
import { ResourceNotFoundError } from '@forum/domain/src/domain/forum/application/use-cases/errors/resource-not-found-error'
import { PrismaQuestionsRepository } from '@/infra/database/repositories/prisma-questions-repository'

export function getQuestionBySlugController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/questions/:slug',
    {
      schema: {
        tags: ['Questions'],
        summary: 'Get question by slug',
        params: z.object({
          slug: z.string(),
        }),
        response: {
          200: z.object({
            question: z.object({
              id: z.string(),
              title: z.string(),
              content: z.string(),
              slug: z.string(),
              authorId: z.string(),
              bestAnswerId: z.string().nullable(),
              createdAt: z.date(),
              updatedAt: z.date().nullable(),
            }),
          }),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { slug } = request.params

      const questionsRepository = new PrismaQuestionsRepository()
      const getQuestionBySlugUseCase = new GetQuestionBySlugUseCase(questionsRepository)

      const result = await getQuestionBySlugUseCase.execute({ slug })

      if (result.isLeft()) {
        const error = result.value

        if (error instanceof ResourceNotFoundError) {
          return reply.status(404).send({ message: error.message })
        }

        return reply.status(400).send({ message: error.message })
      }

      const { question } = result.value

      return reply.status(200).send({
        question: {
          id: question.id.toString(),
          title: question.title,
          content: question.content,
          slug: question.slug.value,
          authorId: question.authorId.toString(),
          bestAnswerId: question.bestAnswerId?.toString() ?? null,
          createdAt: question.createdAt,
          updatedAt: question.updatedAt ?? null,
        },
      })
    },
  )
}
