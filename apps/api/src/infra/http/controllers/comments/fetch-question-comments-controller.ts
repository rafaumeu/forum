import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { FetchQuestionCommentsUseCase } from '@forum/domain/src/domain/forum/application/use-cases/fetch-question-comments'
import { PrismaQuestionCommentsRepository } from '@/infra/database/repositories/prisma-question-comments-repository'

export function fetchQuestionCommentsController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/questions/:questionId/comments',
    {
      schema: {
        tags: ['Comments'],
        summary: 'Fetch question comments',
        params: z.object({
          questionId: z.string().uuid(),
        }),
        querystring: z.object({
          page: z.coerce.number().min(1).default(1),
        }),
        response: {
          200: z.object({
            questionComments: z.array(
              z.object({
                id: z.string(),
                content: z.string(),
                authorId: z.string(),
                questionId: z.string(),
                createdAt: z.date(),
              }),
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { questionId } = request.params
      const { page } = request.query

      const questionCommentsRepository = new PrismaQuestionCommentsRepository()
      const fetchQuestionCommentsUseCase = new FetchQuestionCommentsUseCase(
        questionCommentsRepository,
      )

      const result = await fetchQuestionCommentsUseCase.execute({
        questionId,
        page,
      })

      const { questionComments } = result.value

      return reply.status(200).send({
        questionComments: questionComments.map((comment) => ({
          id: comment.id.toString(),
          content: comment.content,
          authorId: comment.authorId.toString(),
          questionId: comment.questionId.toString(),
          createdAt: comment.createdAt,
        })),
      })
    },
  )
}
