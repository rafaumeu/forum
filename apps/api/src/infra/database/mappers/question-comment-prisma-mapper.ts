import { QuestionComment } from '@forum/domain/domain/forum/enterprise/entities/question-comment'
import { UniqueEntityId } from '@forum/domain/core/entities/unique-entity-id'

import { Prisma, QuestionComment as PrismaQuestionComment } from '@prisma/client'

export class QuestionCommentPrismaMapper {
  static toDomain(raw: PrismaQuestionComment): QuestionComment {
    return QuestionComment.create(
      {
        authorId: new UniqueEntityId(raw.authorId),
        questionId: new UniqueEntityId(raw.questionId),
        content: raw.content,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPersistence(
    entity: QuestionComment,
  ): Prisma.QuestionCommentUncheckedCreateInput {
    return {
      id: entity.id.toString(),
      authorId: entity.authorId.toString(),
      questionId: entity.questionId.toString(),
      content: entity.content,
      createdAt: entity.createdAt,
    }
  }
}
