import { Either, right } from '@/core/either'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

interface FetchPopularQuestionsUseCaseRequest {
  page: number
}

type FetchPopularQuestionsUseCaseResponse = Either<
  null,
  {
    questions: Question[]
  }
>

export class FetchPopularQuestionsUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository,
  ) {}

  async execute({
    page,
  }: FetchPopularQuestionsUseCaseRequest): Promise<FetchPopularQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyPopular(page)

    const questionsWithAnswerCount = await Promise.all(
      questions.map(async (question) => {
        const answers = await this.answersRepository.findManyByQuestionsId(
          question.id.toString(),
          { page: 1 },
        )
        return {
          question,
          answerCount: answers.length,
        }
      }),
    )

    questionsWithAnswerCount.sort((a, b) => b.answerCount - a.answerCount)

    const sortedQuestions = questionsWithAnswerCount.map((item) => item.question)

    return right({ questions: sortedQuestions })
  }
}
