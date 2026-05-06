import { QuestionCommentsRepository } from '@forum/domain/src/domain/forum/application/repositories/question-comment-repository'
import { QuestionComment } from '@forum/domain/src/domain/forum/enterprise/entities/question-comment'

import { prisma } from '../prisma-service'
import { QuestionCommentPrismaMapper } from '../mappers/question-comment-prisma-mapper'

export class PrismaQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = await prisma.questionComment.findUnique({
      where: { id },
    })

    if (!questionComment) {
      return null
    }

    return QuestionCommentPrismaMapper.toDomain(questionComment)
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: { page: number },
  ): Promise<QuestionComment[]> {
    const questionComments = await prisma.questionComment.findMany({
      where: { questionId },
      orderBy: { createdAt: 'desc' },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questionComments.map(QuestionCommentPrismaMapper.toDomain)
  }

  async create(questionComment: QuestionComment): Promise<void> {
    const data = QuestionCommentPrismaMapper.toPersistence(questionComment)

    await prisma.questionComment.create({ data })
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    await prisma.questionComment.delete({
      where: { id: questionComment.id.toString() },
    })
  }
}
