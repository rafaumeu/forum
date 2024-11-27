import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export interface AnswerCommentsRepository {
  create(answer: AnswerComment): Promise<void>
  delete(answer: AnswerComment): Promise<void>
  findById(id: string): Promise<AnswerComment | null>
  findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<AnswerComment[]>
}
