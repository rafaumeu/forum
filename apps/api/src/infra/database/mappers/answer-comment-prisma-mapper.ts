import { AnswerComment } from '@forum/domain/domain/forum/enterprise/entities/answer-comment'
import { UniqueEntityId } from '@forum/domain/core/entities/unique-entity-id'

import { Prisma, AnswerComment as PrismaAnswerComment } from '@prisma/client'

export class AnswerCommentPrismaMapper {
  static toDomain(raw: PrismaAnswerComment): AnswerComment {
    return AnswerComment.create(
      {
        authorId: new UniqueEntityId(raw.authorId),
        answerId: new UniqueEntityId(raw.answerId),
        content: raw.content,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPersistence(
    entity: AnswerComment,
  ): Prisma.AnswerCommentUncheckedCreateInput {
    return {
      id: entity.id.toString(),
      authorId: entity.authorId.toString(),
      answerId: entity.answerId.toString(),
      content: entity.content,
      createdAt: entity.createdAt,
    }
  }
}
