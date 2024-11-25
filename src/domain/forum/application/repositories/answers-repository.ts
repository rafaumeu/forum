import { Answer } from '@/domain/forum/enterprise/entities/answer'

export interface AnswersRepository {
  findById(answerId: string): Promise<Answer | null>
  delete(answer: Answer): Promise<void>
  create(answer: Answer): Promise<void>
}
