import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { FetchPopularQuestionsUseCase } from '@forum/domain/src/domain/forum/application/use-cases/fetch-popular-questions'
import { PrismaQuestionsRepository } from '@/infra/database/repositories/prisma-questions-repository'
import { PrismaAnswersRepository } from '@/infra/database/repositories/prisma-answers-repository'

export function fetchPopularQuestionsController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/questions/popular',
    {
      schema: {
        tags: ['Questions'],
        summary: 'Fetch popular questions (paginated)',
        querystring: z.object({
          page: z.coerce.number().int().positive().optional().default(1),
        }),
        response: {
          200: z.object({
            questions: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
                content: z.string(),
                slug: z.string(),
                authorId: z.string(),
                createdAt: z.date(),
              }),
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { page } = request.query

      const questionsRepository = new PrismaQuestionsRepository()
      const answersRepository = new PrismaAnswersRepository()
      const fetchPopularQuestionsUseCase = new FetchPopularQuestionsUseCase(
        questionsRepository,
        answersRepository,
      )

      const result = await fetchPopularQuestionsUseCase.execute({ page })

      if (result.isLeft()) {
        return reply.status(400).send({ message: result.value })
      }

      const { questions } = result.value

      return reply.status(200).send({
        questions: questions.map((question) => ({
          id: question.id.toString(),
          title: question.title,
          content: question.content,
          slug: question.slug.value,
          authorId: question.authorId.toString(),
          createdAt: question.createdAt,
        })),
      })
    },
  )
}
