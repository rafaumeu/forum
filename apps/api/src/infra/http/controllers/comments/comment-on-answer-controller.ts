import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { CommentOnAnswersUseCase } from '@forum/domain/src/domain/forum/application/use-cases/comment-on-answer'
import { PrismaAnswersRepository } from '@/infra/database/repositories/prisma-answers-repository'
import { PrismaAnswerCommentsRepository } from '@/infra/database/repositories/prisma-answer-comments-repository'
import { ResourceNotFoundError } from '@forum/domain/src/domain/forum/application/use-cases/errors/resource-not-found-error'

export function commentOnAnswerController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/answers/:answerId/comments',
    {
      onRequest: [app.authenticate],
      schema: {
        tags: ['Comments'],
        summary: 'Comment on an answer',
        security: [{ cookieAuth: [] }],
        params: z.object({
          answerId: z.string().uuid(),
        }),
        body: z.object({
          content: z.string(),
        }),
        response: {
          201: z.object({
            answerComment: z.object({
              id: z.string(),
              content: z.string(),
              authorId: z.string(),
              answerId: z.string(),
              createdAt: z.date(),
            }),
          }),
          404: z.object({
            message: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { answerId } = request.params
      const { content } = request.body
      const authorId = request.user.sub

      const answersRepository = new PrismaAnswersRepository()
      const answerCommentsRepository = new PrismaAnswerCommentsRepository()
      const commentOnAnswerUseCase = new CommentOnAnswersUseCase(
        answersRepository,
        answerCommentsRepository,
      )

      const result = await commentOnAnswerUseCase.execute({
        authorId,
        answerId,
        content,
      })

      if (result.isLeft()) {
        const error = result.value

        if (error instanceof ResourceNotFoundError) {
          return reply.status(404).send({ message: error.message })
        }

        return reply.status(400).send({ message: error.message })
      }

      const { answerComment } = result.value

      return reply.status(201).send({
        answerComment: {
          id: answerComment.id.toString(),
          content: answerComment.content,
          authorId: answerComment.authorId.toString(),
          answerId: answerComment.answerId.toString(),
          createdAt: answerComment.createdAt,
        },
      })
    },
  )
}
