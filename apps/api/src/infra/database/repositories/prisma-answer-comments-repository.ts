import { AnswerCommentsRepository } from '@forum/domain/src/domain/forum/application/repositories/answer-comment-repository'
import { AnswerComment } from '@forum/domain/src/domain/forum/enterprise/entities/answer-comment'

import { prisma } from '../prisma-service'
import { AnswerCommentPrismaMapper } from '../mappers/answer-comment-prisma-mapper'

export class PrismaAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = await prisma.answerComment.findUnique({
      where: { id },
    })

    if (!answerComment) {
      return null
    }

    return AnswerCommentPrismaMapper.toDomain(answerComment)
  }

  async findManyByAnswerId(
    answerId: string,
    { page }: { page: number },
  ): Promise<AnswerComment[]> {
    const answerComments = await prisma.answerComment.findMany({
      where: { answerId },
      orderBy: { createdAt: 'desc' },
      take: 20,
      skip: (page - 1) * 20,
    })

    return answerComments.map(AnswerCommentPrismaMapper.toDomain)
  }

  async create(answerComment: AnswerComment): Promise<void> {
    const data = AnswerCommentPrismaMapper.toPersistence(answerComment)

    await prisma.answerComment.create({ data })
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    await prisma.answerComment.delete({
      where: { id: answerComment.id.toString() },
    })
  }
}
