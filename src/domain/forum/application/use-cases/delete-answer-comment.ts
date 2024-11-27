import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comment-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

interface DeleteAnswerCommentUseCaseResponse {
  answerComment: AnswerComment
}
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
      throw new Error('Answer comment not found')
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }
    await this.answerCommentRepository.delete(answerComment)
    return {
      answerComment,
    }
  }
}
