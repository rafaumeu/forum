import type { FastifyInstance } from 'fastify'

import { registerController } from '../controllers/auth/register-controller'
import { authenticateController } from '../controllers/auth/authenticate-controller'

export async function authRoutes(app: FastifyInstance) {
  registerController(app)
  authenticateController(app)
}
