import { RedisCacheRepository } from '@/infra/cache/redis/redis-cache-repository'
import { RedisService } from '@/infra/cache/redis/redis.service'
import { EnvModule } from '@/infra/env/env.module'
import { Module } from '@nestjs/common'
import { CacheRepository } from './cache-repository'

@Module({
  imports: [EnvModule],
  providers: [
    RedisService,
    {
      provide: CacheRepository,
      useClass: RedisCacheRepository,
    },
  ],
  exports: [CacheRepository],
})
export class CacheModule {}
