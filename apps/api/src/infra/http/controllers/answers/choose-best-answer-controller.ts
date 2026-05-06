import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { ChooseQuestionBestAnswerUseCase } from '@forum/domain/src/domain/forum/application/use-cases/choose-question-best-answer'
import { ResourceNotFoundError } from '@forum/domain/src/domain/forum/application/use-cases/errors/resource-not-found-error'
import { NotAllowedError } from '@forum/domain/src/domain/forum/application/use-cases/errors/not-allowed-error'
import { PrismaQuestionsRepository } from '@/infra/database/repositories/prisma-questions-repository'
import { PrismaAnswersRepository } from '@/infra/database/repositories/prisma-answers-repository'

export function chooseBestAnswerController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    '/answers/:answerId/best',
    {
      onRequest: [app.authenticate],
      schema: {
        tags: ['Answers'],
        summary: 'Choose best answer for a question',
        security: [{ cookieAuth: [] }],
        params: z.object({
          answerId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            question: z.object({
              id: z.string(),
              bestAnswerId: z.string(),
            }),
          }),
          401: z.object({ message: z.string() }),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { answerId } = request.params
      const authorId = request.user.sub

      const questionsRepository = new PrismaQuestionsRepository()
      const answersRepository = new PrismaAnswersRepository()
      const chooseBestAnswerUseCase = new ChooseQuestionBestAnswerUseCase(
        questionsRepository,
        answersRepository,
      )

      const result = await chooseBestAnswerUseCase.execute({
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

      const { question } = result.value

      return reply.status(200).send({
        question: {
          id: question.id.toString(),
          bestAnswerId: question.bestAnswerId!.toString(),
        },
      })
    },
  )
}
