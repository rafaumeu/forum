import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { PrismaQuestionMapper } from '@/infra/database/mappers/prisma-question-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(private prisma: PrismaService) {}
  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: { id },
    })
    if (!question) {
      return null
    }
    return PrismaQuestionMapper.toDomain(question)
  }

  findManyRecent(params: PaginationParams): Promise<Question[]> {
    throw new Error('Method not implemented.')
  }

  findBySlug(slug: string): Promise<Question | null> {
    throw new Error('Method not implemented.')
  }

  delete(question: Question): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(question: Question): Promise<void> {
    throw new Error('Method not implemented.')
  }

  create(question: Question): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
