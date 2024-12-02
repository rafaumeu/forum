import { EnvService } from '@/infra/env/env.service'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const envService = app.get(EnvService)
  const port = envService.get('PORT')
  await app.listen(process.env.PORT ?? port)
}
bootstrap()
