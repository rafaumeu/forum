import { AnswerAttachment } from '@forum/domain/domain/forum/enterprise/entities/answer-attachment'
import { UniqueEntityId } from '@forum/domain/core/entities/unique-entity-id'

import { Prisma, AnswerAttachment as PrismaAnswerAttachment } from '@prisma/client'

export class AnswerAttachmentPrismaMapper {
  static toDomain(raw: PrismaAnswerAttachment): AnswerAttachment {
    return AnswerAttachment.create(
      {
        answerId: new UniqueEntityId(raw.answerId),
        attachmentId: new UniqueEntityId(raw.attachmentId),
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPersistence(
    entity: AnswerAttachment,
  ): Prisma.AnswerAttachmentUncheckedCreateInput {
    return {
      id: entity.id.toString(),
      answerId: entity.answerId.toString(),
      attachmentId: entity.attachmentId.toString(),
    }
  }
}
