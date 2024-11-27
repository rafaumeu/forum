import { Either, left, right } from '@/core/either'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comment-repository'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<string, {}>
export class DeleteAnswerCommentsUseCase {
  constructor(private answerCommentRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentRepository.findById(
      answerCommentId,
    )
    if (!answerComment) {
      throw left('Answer comment not found')
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw left('Not allowed')
    }
    await this.answerCommentRepository.delete(answerComment)
    return right({})
  }
}
