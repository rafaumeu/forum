import type { FastifyInstance } from 'fastify'

import { registerController } from '../controllers/auth/register-controller'
import { authenticateController } from '../controllers/auth/authenticate-controller'
import { profileController } from '../controllers/auth/profile-controller'
import { logoutController } from '../controllers/auth/logout-controller'

export async function authRoutes(app: FastifyInstance) {
  registerController(app)
  authenticateController(app)
  profileController(app)
  logoutController(app)
}
