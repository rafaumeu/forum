import fastify from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import prismaPlugin from './plugins/prisma-plugin'
import authPlugin from './plugins/auth-plugin'
import { authRoutes } from './routes/auth-routes'
import { questionRoutes } from './routes/question-routes'
import { answerRoutes } from './routes/answer-routes'
import { commentRoutes } from './routes/comment-routes'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(prismaPlugin)
app.register(authPlugin)

app.register(swagger, {
  openapi: {
    info: {
      title: 'Forum API',
      description: 'Forum API with DDD + Clean Architecture',
      version: '1.0.0',
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
})

app.register(swaggerUi, {
  routePrefix: '/docs',
})

app.register(authRoutes)
app.register(questionRoutes)
app.register(answerRoutes)
app.register(commentRoutes)

app.get('/health', async () => {
  return { status: 'ok' }
})

async function start() {
  const port = Number(process.env.PORT) || 3333
  await app.listen({ port, host: '0.0.0.0' })
  console.log(`Forum API running on port ${port}`)
}

start().catch((err) => {
  console.error(err)
  process.exit(1)
})

export { app }
