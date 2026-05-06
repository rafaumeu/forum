import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { AuthenticateUseCase } from '@forum/domain/src/domain/forum/application/use-cases/authenticate'
import { PrismaUsersRepository } from '@/infra/database/repositories/prisma-users-repository'
import { WrongCredentialsError } from '@forum/domain/src/domain/forum/application/use-cases/errors/wrong-credentials-error'

export function authenticateController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Authenticate a user',
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
        response: {
          200: z.object({
            user: z.object({
              id: z.string(),
              name: z.string(),
              email: z.string().email(),
              role: z.string(),
              createdAt: z.date(),
            }),
          }),
          401: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const usersRepository = new PrismaUsersRepository()
      const authenticateUseCase = new AuthenticateUseCase(usersRepository)

      const result = await authenticateUseCase.execute({
        email,
        password,
      })

      if (result.isLeft()) {
        const error = result.value

        if (error instanceof WrongCredentialsError) {
          return reply.status(401).send({ message: error.message })
        }

        return reply.status(400).send({ message: error.message })
      }

      const { user } = result.value

      const token = await reply.jwtSign(
        { sub: user.id.toString(), role: user.role.getValue() },
        { sign: { sub: user.id.toString() } },
      )

      reply.setCookie('access_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 86400,
      })

      return reply.status(200).send({
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
