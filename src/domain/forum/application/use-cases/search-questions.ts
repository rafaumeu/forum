import { Either, right } from '@/core/either'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

interface SearchQuestionsUseCaseRequest {
  keyword: string
  tags?: string[]
  page: number
}

type SearchQuestionsUseCaseResponse = Either<
  null,
  {
    questions: Question[]
  }
>

export class SearchQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    keyword,
    tags,
    page,
  }: SearchQuestionsUseCaseRequest): Promise<SearchQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.search(keyword, tags, page)

    return right({ questions })
  }
}
