import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { QuestionPresenter } from '@/infra/http/presenter/question-presenter'

import { BadRequestException, Controller, Get, Param } from '@nestjs/common'

@Controller('/questions/:slug')
export class GetQuestionBySlugController {
  constructor(private getQuestionBySlug: GetQuestionBySlugUseCase) {}

  @Get()
  async handle(@Param('slug') slug: string) {
    const result = await this.getQuestionBySlug.execute({
      slug,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return { questions: QuestionPresenter.toHTTP(result.value.question) }
  }
}
