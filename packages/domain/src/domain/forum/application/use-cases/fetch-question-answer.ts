import { Either, right } from '@/core/either'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

interface FetchQuestionsAnswerUseCaseRequest {
  page: number
  questionId: string
}
type FetchQuestionsAnswerUseCaseResponse = Either<
  null,
  {
    answers: Answer[]
  }
>
export class FetchQuestionsAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}
  async execute({
    page,
    questionId,
  }: FetchQuestionsAnswerUseCaseRequest): Promise<FetchQuestionsAnswerUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionsId(
      questionId,
      {
        page,
      },
    )

    return right({ answers })
  }
}
