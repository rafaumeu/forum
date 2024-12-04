import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comment-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'
import { PrismaAnswerCommentMapper } from '@/infra/database/mappers/prisma-answer-comment-mapper'
import { PrismaCommentWithAuthorMapper } from '@/infra/database/mappers/prisma-comment-with-author-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  constructor(private prisma: PrismaService) {}
  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = await this.prisma.comment.findUnique({
      where: { id },
    })
    if (!answerComment) {
      return null
    }
    return PrismaAnswerCommentMapper.toDomain(answerComment)
  }

  async create(answerComment: AnswerComment): Promise<void> {
    const data = PrismaAnswerCommentMapper.toPrisma(answerComment)

    await this.prisma.comment.create({
      data,
    })
  }

  async delete(answer: AnswerComment): Promise<void> {
    await this.prisma.comment.delete({
      where: { id: answer.id.toString() },
    })
  }

  async findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<AnswerComment[]> {
    const answersComments = await this.prisma.comment.findMany({
      where: { answerId },
      orderBy: { createdAt: 'desc' },
      take: 20,
      skip: (page - 1) * 20,
    })
    return answersComments.map(PrismaAnswerCommentMapper.toDomain)
  }

  async findManyByAnswerIdWithAuthor(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<CommentWithAuthor[]> {
    const answersComments = await this.prisma.comment.findMany({
      where: { answerId },
      orderBy: { createdAt: 'desc' },
      include: { author: true },
      take: 20,
      skip: (page - 1) * 20,
    })
    return answersComments.map(PrismaCommentWithAuthorMapper.toDomain)
  }
}
