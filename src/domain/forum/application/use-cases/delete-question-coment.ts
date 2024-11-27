import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comment-repository'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

interface DeleteQuestionCommentUseCaseResponse {}
export class DeleteQuestionCommentsUseCase {
  constructor(private questionCommentRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this.questionCommentRepository.findById(
      questionCommentId,
    )
    if (!questionComment) {
      throw new Error('Question comment not found')
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }
    await this.questionCommentRepository.delete(questionComment)
    return {}
  }
}
