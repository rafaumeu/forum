import { AnswersRepository } from '@forum/domain/src/domain/forum/application/repositories/answers-repository'
import { Answer } from '@forum/domain/src/domain/forum/enterprise/entities/answer'

import { prisma } from '../prisma-service'
import { AnswerPrismaMapper } from '../mappers/answer-prisma-mapper'

export class PrismaAnswersRepository implements AnswersRepository {
  async findById(answerId: string): Promise<Answer | null> {
    const answer = await prisma.answer.findUnique({
      where: { id: answerId },
    })

    if (!answer) {
      return null
    }

    return AnswerPrismaMapper.toDomain(answer)
  }

  async findManyByQuestionsId(
    questionId: string,
    { page }: { page: number },
  ): Promise<Answer[]> {
    const answers = await prisma.answer.findMany({
      where: { questionId },
      orderBy: { createdAt: 'desc' },
      take: 20,
      skip: (page - 1) * 20,
    })

    return answers.map(AnswerPrismaMapper.toDomain)
  }

  async create(answer: Answer): Promise<void> {
    const data = AnswerPrismaMapper.toPersistence(answer)

    await prisma.answer.create({ data })
  }

  async save(answer: Answer): Promise<void> {
    const data = AnswerPrismaMapper.toPersistence(answer)

    await prisma.answer.update({
      where: { id: data.id },
      data,
    })
  }

  async delete(answer: Answer): Promise<void> {
    await prisma.answer.delete({
      where: { id: answer.id.toString() },
    })
  }
}
