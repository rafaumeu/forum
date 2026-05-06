import { Question } from '@forum/domain/domain/forum/enterprise/entities/question'
import { UniqueEntityId } from '@forum/domain/core/entities/unique-entity-id'
import { Slug } from '@forum/domain/domain/forum/enterprise/entities/value-objects/slug'

import { Prisma, Question as PrismaQuestion } from '@prisma/client'

export class QuestionPrismaMapper {
  static toDomain(raw: PrismaQuestion): Question {
    return Question.create(
      {
        authorId: new UniqueEntityId(raw.authorId),
        bestAnswerId: raw.bestAnswerId
          ? new UniqueEntityId(raw.bestAnswerId)
          : undefined,
        title: raw.title,
        content: raw.content,
        slug: Slug.create(raw.slug),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPersistence(entity: Question): Prisma.QuestionUncheckedCreateInput {
    return {
      id: entity.id.toString(),
      authorId: entity.authorId.toString(),
      bestAnswerId: entity.bestAnswerId?.toString() ?? null,
      title: entity.title,
      slug: entity.slug.value,
      content: entity.content,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt ?? new Date(),
    }
  }
}
