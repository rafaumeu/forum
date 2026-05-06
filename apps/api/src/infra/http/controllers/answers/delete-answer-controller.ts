import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { DeleteAnswerUseCase } from '@forum/domain/src/domain/forum/application/use-cases/delete-answer'
import { ResourceNotFoundError } from '@forum/domain/src/domain/forum/application/use-cases/errors/resource-not-found-error'
import { NotAllowedError } from '@forum/domain/src/domain/forum/application/use-cases/errors/not-allowed-error'
import { PrismaAnswersRepository } from '@/infra/database/repositories/prisma-answers-repository'

export function deleteAnswerController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/answers/:answerId',
    {
      onRequest: [app.authenticate],
      schema: {
        tags: ['Answers'],
        summary: 'Delete an answer',
        security: [{ cookieAuth: [] }],
        params: z.object({
          answerId: z.string().uuid(),
        }),
        response: {
          204: z.null(),
          401: z.object({ message: z.string() }),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { answerId } = request.params
      const authorId = request.user.sub

      const answersRepository = new PrismaAnswersRepository()
      const deleteAnswerUseCase = new DeleteAnswerUseCase(answersRepository)

      const result = await deleteAnswerUseCase.execute({
        answerId,
        authorId,
      })

      if (result.isLeft()) {
        const error = result.value

        if (error instanceof ResourceNotFoundError) {
          return reply.status(404).send({ message: error.message })
        }

        if (error instanceof NotAllowedError) {
          return reply.status(401).send({ message: error.message })
        }

        return reply.status(400).send({ message: error.message })
      }

      return reply.status(204).send()
    },
  )
}
