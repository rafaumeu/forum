import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { AnswerQuestionUseCase } from '@forum/domain/src/domain/forum/application/use-cases/answer-question'
import { PrismaAnswersRepository } from '@/infra/database/repositories/prisma-answers-repository'

export function answerQuestionController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/questions/:questionId/answers',
    {
      onRequest: [app.authenticate],
      schema: {
        tags: ['Answers'],
        summary: 'Answer a question',
        security: [{ cookieAuth: [] }],
        params: z.object({
          questionId: z.string().uuid(),
        }),
        body: z.object({
          content: z.string(),
          attachmentsIds: z.array(z.string()).optional(),
        }),
        response: {
          201: z.object({
            answer: z.object({
              id: z.string(),
              content: z.string(),
              authorId: z.string(),
              questionId: z.string(),
              createdAt: z.date(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { questionId } = request.params
      const { content, attachmentsIds } = request.body
      const instructorId = request.user.sub

      const answersRepository = new PrismaAnswersRepository()
      const answerQuestionUseCase = new AnswerQuestionUseCase(answersRepository)

      const result = await answerQuestionUseCase.execute({
        instructorId,
        questionId,
        content,
        attachmentsIds: attachmentsIds ?? [],
      })

      if (result.isLeft()) {
        return reply.status(400).send({ message: result.value })
      }

      const { answer } = result.value

      return reply.status(201).send({
        answer: {
          id: answer.id.toString(),
          content: answer.content,
          authorId: answer.authorId.toString(),
          questionId: answer.questionId.toString(),
          createdAt: answer.createdAt,
        },
      })
    },
  )
}
