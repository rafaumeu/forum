import { QuestionsRepository } from '@forum/domain/src/domain/forum/application/repositories/questions-repository'
import { Question } from '@forum/domain/src/domain/forum/enterprise/entities/question'

import { prisma } from '../prisma-service'
import { QuestionPrismaMapper } from '../mappers/question-prisma-mapper'

export class PrismaQuestionsRepository implements QuestionsRepository {
  async findById(id: string): Promise<Question | null> {
    const question = await prisma.question.findUnique({
      where: { id },
    })

    if (!question) {
      return null
    }

    return QuestionPrismaMapper.toDomain(question)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = await prisma.question.findUnique({
      where: { slug },
    })

    if (!question) {
      return null
    }

    return QuestionPrismaMapper.toDomain(question)
  }

  async findManyRecent({ page }: { page: number }): Promise<Question[]> {
    const questions = await prisma.question.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questions.map(QuestionPrismaMapper.toDomain)
  }

  async search(
    keyword: string,
    tags?: string[],
    page?: number,
  ): Promise<Question[]> {
    const currentPage = page ?? 1

    const questions = await prisma.question.findMany({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: keyword, mode: 'insensitive' } },
              { content: { contains: keyword, mode: 'insensitive' } },
            ],
          },
          ...(tags && tags.length > 0
            ? [
                {
                  tags: {
                    some: {
                      value: { in: tags },
                    },
                  },
                },
              ]
            : []),
        ],
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
      skip: (currentPage - 1) * 20,
    })

    return questions.map(QuestionPrismaMapper.toDomain)
  }

  async findManyPopular(page: number): Promise<Question[]> {
    const questions = await prisma.question.findMany({
      include: {
        _count: {
          select: { answers: true },
        },
      },
      orderBy: {
        answers: {
          _count: 'desc',
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questions.map((q) => QuestionPrismaMapper.toDomain(q))
  }

  async create(question: Question): Promise<void> {
    const data = QuestionPrismaMapper.toPersistence(question)

    await prisma.question.create({ data })
  }

  async save(question: Question): Promise<void> {
    const data = QuestionPrismaMapper.toPersistence(question)

    await prisma.question.update({
      where: { id: data.id },
      data,
    })
  }

  async delete(question: Question): Promise<void> {
    await prisma.question.delete({
      where: { id: question.id.toString() },
    })
  }
}
