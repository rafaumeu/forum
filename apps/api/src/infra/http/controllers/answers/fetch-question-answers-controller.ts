import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { FetchQuestionsAnswerUseCase } from '@forum/domain/src/domain/forum/application/use-cases/fetch-question-answer'
import { PrismaAnswersRepository } from '@/infra/database/repositories/prisma-answers-repository'

export function fetchQuestionAnswersController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/questions/:questionId/answers',
    {
      schema: {
        tags: ['Answers'],
        summary: 'Fetch answers for a question (paginated)',
        params: z.object({
          questionId: z.string().uuid(),
        }),
        querystring: z.object({
          page: z.coerce.number().int().positive().optional().default(1),
        }),
        response: {
          200: z.object({
            answers: z.array(
              z.object({
                id: z.string(),
                content: z.string(),
                authorId: z.string(),
                questionId: z.string(),
                createdAt: z.date(),
              }),
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { questionId } = request.params
      const { page } = request.query

      const answersRepository = new PrismaAnswersRepository()
      const fetchQuestionsAnswerUseCase = new FetchQuestionsAnswerUseCase(answersRepository)

      const result = await fetchQuestionsAnswerUseCase.execute({
        questionId,
        page,
      })

      if (result.isLeft()) {
        return reply.status(400).send({ message: result.value })
      }

      const { answers } = result.value

      return reply.status(200).send({
        answers: answers.map((answer) => ({
          id: answer.id.toString(),
          content: answer.content,
          authorId: answer.authorId.toString(),
          questionId: answer.questionId.toString(),
          createdAt: answer.createdAt,
        })),
      })
    },
  )
}
