import { Attachment } from '@forum/domain/domain/forum/enterprise/entities/attachment'
import { UniqueEntityId } from '@forum/domain/core/entities/unique-entity-id'

import { Prisma, Attachment as PrismaAttachment } from '@prisma/client'

export class AttachmentPrismaMapper {
  static toDomain(raw: PrismaAttachment): Attachment {
    return Attachment.create(
      {
        title: '',
        link: raw.url,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPersistence(
    entity: Attachment,
  ): Prisma.AttachmentUncheckedCreateInput {
    return {
      id: entity.id.toString(),
      url: entity.link,
      userId: '',
    }
  }
}
