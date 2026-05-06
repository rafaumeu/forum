import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { DeleteQuestionUseCase } from '@forum/domain/src/domain/forum/application/use-cases/delete-question'
import { ResourceNotFoundError } from '@forum/domain/src/domain/forum/application/use-cases/errors/resource-not-found-error'
import { NotAllowedError } from '@forum/domain/src/domain/forum/application/use-cases/errors/not-allowed-error'
import { PrismaQuestionsRepository } from '@/infra/database/repositories/prisma-questions-repository'

export function deleteQuestionController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/questions/:questionId',
    {
      onRequest: [app.authenticate],
      schema: {
        tags: ['Questions'],
        summary: 'Delete a question',
        security: [{ cookieAuth: [] }],
        params: z.object({
          questionId: z.string().uuid(),
        }),
        response: {
          204: z.null(),
          401: z.object({ message: z.string() }),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { questionId } = request.params
      const authorId = request.user.sub

      const questionsRepository = new PrismaQuestionsRepository()
      const deleteQuestionUseCase = new DeleteQuestionUseCase(questionsRepository)

      const result = await deleteQuestionUseCase.execute({
        questionId,
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
