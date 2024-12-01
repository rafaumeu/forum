import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comment-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  findById(id: string): Promise<QuestionComment | null> {
    throw new Error('Method not implemented.')
  }

  create(question: QuestionComment): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(question: QuestionComment): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<QuestionComment[]> {
    throw new Error('Method not implemented.')
  }
}
