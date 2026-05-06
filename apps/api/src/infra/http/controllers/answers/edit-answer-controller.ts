import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { EditAnswerUseCase } from '@forum/domain/src/domain/forum/application/use-cases/edit-answer'
import { ResourceNotFoundError } from '@forum/domain/src/domain/forum/application/use-cases/errors/resource-not-found-error'
import { NotAllowedError } from '@forum/domain/src/domain/forum/application/use-cases/errors/not-allowed-error'
import { PrismaAnswersRepository } from '@/infra/database/repositories/prisma-answers-repository'
import { PrismaAnswerAttachmentsRepository } from '@/infra/database/repositories/prisma-answer-attachments-repository'

export function editAnswerController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/answers/:answerId',
    {
      onRequest: [app.authenticate],
      schema: {
        tags: ['Answers'],
        summary: 'Edit an answer',
        security: [{ cookieAuth: [] }],
        params: z.object({
          answerId: z.string().uuid(),
        }),
        body: z.object({
          content: z.string(),
          attachmentsIds: z.array(z.string()).optional(),
        }),
        response: {
          200: z.object({
            answer: z.object({
              id: z.string(),
              content: z.string(),
              authorId: z.string(),
              questionId: z.string(),
              createdAt: z.date(),
              updatedAt: z.date().nullable(),
            }),
          }),
          400: z.object({ message: z.string() }),
          401: z.object({ message: z.string() }),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { answerId } = request.params
      const { content, attachmentsIds } = request.body
      const authorId = request.user.sub

      const answersRepository = new PrismaAnswersRepository()
      const answerAttachmentsRepository = new PrismaAnswerAttachmentsRepository()
      const editAnswerUseCase = new EditAnswerUseCase(
        answersRepository,
        answerAttachmentsRepository,
      )

      const result = await editAnswerUseCase.execute({
        authorId,
        content,
        answerId,
        attachmentsIds: attachmentsIds ?? [],
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

      const { answer } = result.value

      return reply.status(200).send({
        answer: {
          id: answer.id.toString(),
          content: answer.content,
          authorId: answer.authorId.toString(),
          questionId: answer.questionId.toString(),
          createdAt: answer.createdAt,
          updatedAt: answer.updatedAt ?? null,
        },
      })
    },
  )
}
