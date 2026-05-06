import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { SearchQuestionsUseCase } from '@forum/domain/src/domain/forum/application/use-cases/search-questions'
import { PrismaQuestionsRepository } from '@/infra/database/repositories/prisma-questions-repository'

export function searchQuestionsController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/questions/search',
    {
      schema: {
        tags: ['Questions'],
        summary: 'Search questions by keyword and/or tags',
        querystring: z.object({
          q: z.string().optional(),
          tags: z.string().optional(),
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
      const { q, tags, page } = request.query

      const keyword = q ?? ''
      const tagsList = tags ? tags.split(',') : undefined

      const questionsRepository = new PrismaQuestionsRepository()
      const searchQuestionsUseCase = new SearchQuestionsUseCase(questionsRepository)

      const result = await searchQuestionsUseCase.execute({
        keyword,
        tags: tagsList,
        page,
      })

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
