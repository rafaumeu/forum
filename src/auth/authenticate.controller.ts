import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { z } from 'zod'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>
@Controller('/sessions')
export class AuthenticateController {
  constructor(private jwt: JwtService) {}
  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const token = this.jwt.sign({ sub: 'user.id' })
    return { token }
  }
}
