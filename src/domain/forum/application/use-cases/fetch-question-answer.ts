import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

interface FetchQuestionsAnswerUseCaseRequest {
  page: number
  questionId: string
}
interface FetchQuestionsAnswerUseCaseResponse {
  answers: Answer[]
}
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

    return { answers }
  }
}
