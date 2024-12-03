import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { AnswerPresenter } from '@/infra/http/presenter/answer-presenter'
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { z } from 'zod'
import { FetchQuestionsAnswerUseCase } from '../../../domain/forum/application/use-cases/fetch-question-answer'

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)
type PageQueryParams = z.infer<typeof pageQueryParamsSchema>
@Controller('/questions/:questionId/answers')
export class FetchQuestionsAnswersController {
  constructor(private fetchQuestionsAnswers: FetchQuestionsAnswerUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParams,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.fetchQuestionsAnswers.execute({
      page,
      questionId,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
    const answers = result.value.answers

    return { answers: answers.map(AnswerPresenter.toHTTP) }
  }
}
