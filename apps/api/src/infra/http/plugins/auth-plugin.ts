import fp from 'fastify-plugin'
import type { FastifyInstance, FastifyRequest } from 'fastify'
import jwt from '@fastify/jwt'
import cookie from '@fastify/cookie'

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest) => Promise<void>
  }
}

export default fp(async (app: FastifyInstance) => {
  app.register(jwt, {
    secret: process.env.JWT_SECRET!,
  })

  app.register(cookie)

  app.decorate('authenticate', async (request: FastifyRequest) => {
    const token = request.cookies.access_token

    if (!token) {
      const unauthorizedError = new Error('Missing access token')
      ;(unauthorizedError as any).statusCode = 401
      throw unauthorizedError
    }

    const decoded = app.jwt.verify<{ sub: string; role: string }>(token)
    request.user = { sub: decoded.sub, role: decoded.role }
  })
})
