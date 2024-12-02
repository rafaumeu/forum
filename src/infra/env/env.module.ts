import { EnvService } from '@/infra/env/env.service'
import { Module } from '@nestjs/common'

@Module({
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
