import { CreateAccountController } from '@/controllers/create-account.controller'
import { PrismaService } from '@/prisma/prisma.service'
import { Module } from '@nestjs/common'

@Module({
  imports: [],
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}
