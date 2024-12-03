import { CommentOnQuestionsUseCase } from '@/domain/forum/application/use-cases/comment-on-question'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common'
import { z } from 'zod'

const commentOnQuestionBodySchema = z.object({
  content: z.string(),
})
const bodyValidationPipe = new ZodValidationPipe(commentOnQuestionBodySchema)
type CommentOnQuestionBodySchema = z.infer<typeof commentOnQuestionBodySchema>
@Controller('/questions/:questionId/comments')
export class CommentOnQuestionController {
  constructor(private commentOnQuestion: CommentOnQuestionsUseCase) {}

  @Post()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: CommentOnQuestionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('questionId') questionId: string,
  ) {
    const { content } = body
    const userId = user.sub
    const result = await this.commentOnQuestion.execute({
      content,
      questionId,
      authorId: userId,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
