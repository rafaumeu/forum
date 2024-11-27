import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comment-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

interface FetchAnswerCommentsUseCaseRequest {
  page: number
  answerCommentId: string
}
interface FetchAnswerCommentsUseCaseResponse {
  answersComment: AnswerComment[]
}
export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}
  async execute({
    page,
    answerCommentId,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answersComment =
      await this.answerCommentsRepository.findManyByAnswerId(answerCommentId, {
        page,
      })

    return { answersComment }
  }
}
