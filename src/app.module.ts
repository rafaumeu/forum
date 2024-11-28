import { AuthModule } from '@/auth/auth.module'
import { AuthenticateController } from '@/auth/authenticate.controller'
import { CreateAccountController } from '@/controllers/create-account.controller'
import { envSchema } from '@/env'
import { PrismaService } from '@/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [CreateAccountController, AuthenticateController],
  providers: [PrismaService],
})
export class AppModule {}
