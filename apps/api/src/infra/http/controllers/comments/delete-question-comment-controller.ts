import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { DeleteQuestionCommentsUseCase } from '@forum/domain/src/domain/forum/application/use-cases/delete-question-comment'
import { PrismaQuestionCommentsRepository } from '@/infra/database/repositories/prisma-question-comments-repository'
import { ResourceNotFoundError } from '@forum/domain/src/domain/forum/application/use-cases/errors/resource-not-found-error'
import { NotAllowedError } from '@forum/domain/src/domain/forum/application/use-cases/errors/not-allowed-error'

export function deleteQuestionCommentController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/question-comments/:commentId',
    {
      onRequest: [app.authenticate],
      schema: {
        tags: ['Comments'],
        summary: 'Delete a question comment',
        security: [{ cookieAuth: [] }],
        params: z.object({
          commentId: z.string().uuid(),
        }),
        response: {
          204: z.null(),
          404: z.object({
            message: z.string(),
          }),
          403: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { commentId } = request.params
      const authorId = request.user.sub

      const questionCommentsRepository = new PrismaQuestionCommentsRepository()
      const deleteQuestionCommentUseCase = new DeleteQuestionCommentsUseCase(
        questionCommentsRepository,
      )

      const result = await deleteQuestionCommentUseCase.execute({
        authorId,
        questionCommentId: commentId,
      })

      if (result.isLeft()) {
        const error = result.value

        if (error instanceof ResourceNotFoundError) {
          return reply.status(404).send({ message: error.message })
        }

        if (error instanceof NotAllowedError) {
          return reply.status(403).send({ message: error.message })
        }

        return reply.status(400).send({ message: error.message })
      }

      return reply.status(204).send()
    },
  )
}
