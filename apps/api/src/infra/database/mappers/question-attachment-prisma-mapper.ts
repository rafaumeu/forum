import { QuestionAttachment } from '@forum/domain/domain/forum/enterprise/entities/question-attachment'
import { UniqueEntityId } from '@forum/domain/core/entities/unique-entity-id'

import { Prisma, QuestionAttachment as PrismaQuestionAttachment } from '@prisma/client'

export class QuestionAttachmentPrismaMapper {
  static toDomain(raw: PrismaQuestionAttachment): QuestionAttachment {
    return QuestionAttachment.create(
      {
        questionId: new UniqueEntityId(raw.questionId),
        attachmentId: new UniqueEntityId(raw.attachmentId),
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPersistence(
    entity: QuestionAttachment,
  ): Prisma.QuestionAttachmentUncheckedCreateInput {
    return {
      id: entity.id.toString(),
      questionId: entity.questionId.toString(),
      attachmentId: entity.attachmentId.toString(),
    }
  }
}
