import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { CommentOnQuestionsUseCase } from '@forum/domain/src/domain/forum/application/use-cases/comment-on-question'
import { PrismaQuestionsRepository } from '@/infra/database/repositories/prisma-questions-repository'
import { PrismaQuestionCommentsRepository } from '@/infra/database/repositories/prisma-question-comments-repository'
import { ResourceNotFoundError } from '@forum/domain/src/domain/forum/application/use-cases/errors/resource-not-found-error'

export function commentOnQuestionController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/questions/:questionId/comments',
    {
      onRequest: [app.authenticate],
      schema: {
        tags: ['Comments'],
        summary: 'Comment on a question',
        security: [{ cookieAuth: [] }],
        params: z.object({
          questionId: z.string().uuid(),
        }),
        body: z.object({
          content: z.string(),
        }),
        response: {
          201: z.object({
            questionComment: z.object({
              id: z.string(),
              content: z.string(),
              authorId: z.string(),
              questionId: z.string(),
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
      const { questionId } = request.params
      const { content } = request.body
      const authorId = request.user.sub

      const questionsRepository = new PrismaQuestionsRepository()
      const questionCommentsRepository = new PrismaQuestionCommentsRepository()
      const commentOnQuestionUseCase = new CommentOnQuestionsUseCase(
        questionsRepository,
        questionCommentsRepository,
      )

      const result = await commentOnQuestionUseCase.execute({
        authorId,
        questionId,
        content,
      })

      if (result.isLeft()) {
        const error = result.value

        if (error instanceof ResourceNotFoundError) {
          return reply.status(404).send({ message: error.message })
        }

        return reply.status(400).send({ message: error.message })
      }

      const { questionComment } = result.value

      return reply.status(201).send({
        questionComment: {
          id: questionComment.id.toString(),
          content: questionComment.content,
          authorId: questionComment.authorId.toString(),
          questionId: questionComment.questionId.toString(),
          createdAt: questionComment.createdAt,
        },
      })
    },
  )
}
