import { JwtStrategy } from '@/auth/jwt.strategy'
import { Env } from '@/env'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: (config: ConfigService<Env, true>) => {
        const privateKey = config.get('JWT_SECRET_PRIVATE_KEY', { inter: true })
        const publicKey = config.get('JWT_SECRET_PUBLIC_KEY', { inter: true })
        return {
          signOptions: {
            algorithm: 'RS256',
          },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        }
      },
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
