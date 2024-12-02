import { AuthModule } from '@/infra/auth/auth.module'
import { envSchema } from '@/infra/env/env'
import { EnvModule } from '@/infra/env/env.module'

import { HttpModule } from '@/infra/http/http.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
    EnvModule,
  ],
})
export class AppModule {}
