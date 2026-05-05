import { PaginationParams } from '@/core/repositories/pagination-params'
import { Question } from '@/domain/forum/enterprise/entities/question'

export interface QuestionsRepository {
  findById(id: string): Promise<Question | null>
  findManyRecent(params: PaginationParams): Promise<Question[]>
  findBySlug(slug: string): Promise<Question | null>
  delete(question: Question): Promise<void>
  save(question: Question): Promise<void>
  create(question: Question): Promise<void>
  search(keyword: string, tags?: string[], page?: number): Promise<Question[]>
  findManyPopular(page: number): Promise<Question[]>
}
