import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export interface AnswerCommentsRepository {
  create(answer: AnswerComment): Promise<void>
}
