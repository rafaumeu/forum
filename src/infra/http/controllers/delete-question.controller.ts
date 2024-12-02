import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

@Controller('/questions')
export class DeleteQuestionController {
  constructor(private deleteQuestion: DeleteQuestionUseCase) {}

  @Delete(':id')
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') questionId: string,
  ) {
    const userId = user.sub
    const result = await this.deleteQuestion.execute({
      questionId,
      authorId: userId,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
