import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comment-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment
}
export class CommentOnQuestionsUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)
    if (!question) {
      throw new Error('Question not found')
    }
    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })
    await this.questionCommentRepository.create(questionComment)
    return {
      questionComment,
    }
  }
}