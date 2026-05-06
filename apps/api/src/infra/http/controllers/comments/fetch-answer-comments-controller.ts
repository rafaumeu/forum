import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { FetchAnswerCommentsUseCase } from '@forum/domain/src/domain/forum/application/use-cases/fetch-answers-comment'
import { PrismaAnswerCommentsRepository } from '@/infra/database/repositories/prisma-answer-comments-repository'

export function fetchAnswerCommentsController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/answers/:answerId/comments',
    {
      schema: {
        tags: ['Comments'],
        summary: 'Fetch answer comments',
        params: z.object({
          answerId: z.string().uuid(),
        }),
        querystring: z.object({
          page: z.coerce.number().min(1).default(1),
        }),
        response: {
          200: z.object({
            answerComments: z.array(
              z.object({
                id: z.string(),
                content: z.string(),
                authorId: z.string(),
                answerId: z.string(),
                createdAt: z.date(),
              }),
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { answerId } = request.params
      const { page } = request.query

      const answerCommentsRepository = new PrismaAnswerCommentsRepository()
      const fetchAnswerCommentsUseCase = new FetchAnswerCommentsUseCase(
        answerCommentsRepository,
      )

      const result = await fetchAnswerCommentsUseCase.execute({
        answerCommentId: answerId,
        page,
      })

      const { answersComment } = result.value

      return reply.status(200).send({
        answerComments: answersComment.map((comment) => ({
          id: comment.id.toString(),
          content: comment.content,
          authorId: comment.authorId.toString(),
          answerId: comment.answerId.toString(),
          createdAt: comment.createdAt,
        })),
      })
    },
  )
}
