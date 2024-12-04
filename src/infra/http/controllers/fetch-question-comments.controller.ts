import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comments'
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
@Controller('/questions/:questionId/comments')
export class FetchQuestionsCommentsController {
  constructor(private fetchQuestionsComments: FetchQuestionCommentsUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParams,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.fetchQuestionsComments.execute({
      page,
      questionId,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
    const comments = result.value.comments

    return { comments: comments.map(CommentWithAuthorPresenter.toHTTP) }
  }
}
