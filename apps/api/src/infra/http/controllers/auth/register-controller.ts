import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { RegisterUseCase } from '@forum/domain/src/domain/forum/application/use-cases/register'
import { PrismaUsersRepository } from '@/infra/database/repositories/prisma-users-repository'
import { UserAlreadyExistsError } from '@forum/domain/src/domain/forum/application/use-cases/errors/user-already-exists-error'

export function registerController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/register',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Register a new user',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(6),
          role: z.enum(['STUDENT', 'INSTRUCTOR']).optional(),
        }),
        response: {
          201: z.object({
            user: z.object({
              id: z.string(),
              name: z.string(),
              email: z.string().email(),
              role: z.string(),
              createdAt: z.date(),
            }),
          }),
          409: z.object({
            message: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email, password, role } = request.body

      const usersRepository = new PrismaUsersRepository()
      const registerUseCase = new RegisterUseCase(usersRepository)

      const result = await registerUseCase.execute({
        name,
        email,
        password,
        role,
      })

      if (result.isLeft()) {
        const error = result.value

        if (error instanceof UserAlreadyExistsError) {
          return reply.status(409).send({ message: error.message })
        }

        return reply.status(400).send({ message: error.message })
      }

      const { user } = result.value

      return reply.status(201).send({
        user: {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role.getValue(),
          createdAt: user.createdAt,
        },
      })
    },
  )
}
