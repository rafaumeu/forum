import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { PrismaUsersRepository } from '@/infra/database/repositories/prisma-users-repository'

export function profileController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/me',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Get current authenticated user',
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
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const userId = request.user.sub

      const usersRepository = new PrismaUsersRepository()
      const user = await usersRepository.findById(userId)

      if (!user) {
        return reply.status(401).send({ message: 'User not found' })
      }

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
