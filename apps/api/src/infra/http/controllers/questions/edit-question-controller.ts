import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { EditQuestionUseCase } from '@forum/domain/src/domain/forum/application/use-cases/edit-question'
import { ResourceNotFoundError } from '@forum/domain/src/domain/forum/application/use-cases/errors/resource-not-found-error'
import { NotAllowedError } from '@forum/domain/src/domain/forum/application/use-cases/errors/not-allowed-error'
import { PrismaQuestionsRepository } from '@/infra/database/repositories/prisma-questions-repository'
import { PrismaQuestionAttachmentsRepository } from '@/infra/database/repositories/prisma-question-attachments-repository'

export function editQuestionController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/questions/:questionId',
    {
      onRequest: [app.authenticate],
      schema: {
        tags: ['Questions'],
        summary: 'Edit a question',
        security: [{ cookieAuth: [] }],
        params: z.object({
          questionId: z.string().uuid(),
        }),
        body: z.object({
          title: z.string(),
          content: z.string(),
          attachmentsIds: z.array(z.string()).optional(),
        }),
        response: {
          200: z.object({
            question: z.object({
              id: z.string(),
              title: z.string(),
              content: z.string(),
              slug: z.string(),
              authorId: z.string(),
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
      const { questionId } = request.params
      const { title, content, attachmentsIds } = request.body
      const authorId = request.user.sub

      const questionsRepository = new PrismaQuestionsRepository()
      const questionAttachmentsRepository = new PrismaQuestionAttachmentsRepository()
      const editQuestionUseCase = new EditQuestionUseCase(
        questionsRepository,
        questionAttachmentsRepository,
      )

      const result = await editQuestionUseCase.execute({
        authorId,
        title,
        content,
        questionId,
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

      const { question } = result.value

      return reply.status(200).send({
        question: {
          id: question.id.toString(),
          title: question.title,
          content: question.content,
          slug: question.slug.value,
          authorId: question.authorId.toString(),
          createdAt: question.createdAt,
          updatedAt: question.updatedAt ?? null,
        },
      })
    },
  )
}
