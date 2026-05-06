import { Answer } from '@forum/domain/domain/forum/enterprise/entities/answer'
import { UniqueEntityId } from '@forum/domain/core/entities/unique-entity-id'

import { Prisma, Answer as PrismaAnswer } from '@prisma/client'

export class AnswerPrismaMapper {
  static toDomain(raw: PrismaAnswer): Answer {
    return Answer.create(
      {
        authorId: new UniqueEntityId(raw.authorId),
        questionId: new UniqueEntityId(raw.questionId),
        content: raw.content,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPersistence(entity: Answer): Prisma.AnswerUncheckedCreateInput {
    return {
      id: entity.id.toString(),
      authorId: entity.authorId.toString(),
      questionId: entity.questionId.toString(),
      content: entity.content,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt ?? new Date(),
    }
  }
}
