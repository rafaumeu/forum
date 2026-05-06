import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export function logoutController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/logout',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Logout current user',
        response: {
          204: z.null(),
        },
      },
    },
    async (request, reply) => {
      reply.clearCookie('access_token', {
        path: '/',
      })

      return reply.status(204).send()
    },
  )
}
