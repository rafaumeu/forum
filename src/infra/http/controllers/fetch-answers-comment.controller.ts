import { FetchAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-answers-comment'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { CommentWithAuthorPresenter } from '@/infra/http/presenter/comment-with-author-presenter'

import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { z } from 'zod'

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)
type PageQueryParams = z.infer<typeof pageQueryParamsSchema>
@Controller('/answers/:answerId/comments')
export class FetchAnswersCommentsController {
  constructor(private fetchAnswerComments: FetchAnswerCommentsUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParams,
    @Param('answerId') answerId: string,
  ) {
    const result = await this.fetchAnswerComments.execute({
      page,
      answerId,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
    const answerComments = result.value.comments

    return { comments: answerComments.map(CommentWithAuthorPresenter.toHTTP) }
  }
}
