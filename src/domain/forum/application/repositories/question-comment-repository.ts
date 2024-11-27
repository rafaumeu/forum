import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export interface QuestionCommentsRepository {
  findById(id: string): Promise<QuestionComment | null>
  create(question: QuestionComment): Promise<void>
  delete(question: QuestionComment): Promise<void>
}
