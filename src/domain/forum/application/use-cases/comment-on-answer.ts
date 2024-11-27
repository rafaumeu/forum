import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comment-repository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment
}
export class CommentOnAnswersUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)
    if (!answer) {
      throw new Error('Answer not found')
    }
    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })
    await this.answerCommentRepository.create(answerComment)
    return {
      answerComment,
    }
  }
}