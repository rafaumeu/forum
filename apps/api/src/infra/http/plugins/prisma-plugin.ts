import fp from 'fastify-plugin'
import type { FastifyInstance } from 'fastify'

import { prisma, PrismaService } from '@/infra/database/prisma-service'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaService
  }
}

export default fp(async (app: FastifyInstance) => {
  app.decorate('prisma', prisma)

  app.addHook('onClose', async () => {
    await app.prisma.$disconnect()
  })
})
