import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

interface EditAnswerUseCaseRequest {
  authorId: string
  content: string
  answerId: string
}

interface EditAnswerUseCaseResponse {
  answer: Answer
}
export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}
  async execute({
    authorId,
    content,
    answerId,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)
    if (!answer) {
      throw new Error('Answer not found')
    }
    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    answer.content = content
    await this.answersRepository.save(answer)
    return {
      answer,
    }
  }
}
