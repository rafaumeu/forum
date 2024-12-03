import { DeleteQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/delete-question-coment'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

@Controller('/questions/comments/:id')
export class DeleteQuestionCommentController {
  constructor(private deleteQuestionComment: DeleteQuestionCommentsUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') questionCommentId: string,
  ) {
    const userId = user.sub
    const result = await this.deleteQuestionComment.execute({
      questionCommentId,
      authorId: userId,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
