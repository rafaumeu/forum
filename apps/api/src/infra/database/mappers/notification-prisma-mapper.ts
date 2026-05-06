import { Notification } from '@forum/domain/domain/notification/enterprise/notification'
import { UniqueEntityId } from '@forum/domain/core/entities/unique-entity-id'

import { Prisma, Notification as PrismaNotification } from '@prisma/client'

export class NotificationPrismaMapper {
  static toDomain(raw: PrismaNotification): Notification {
    return Notification.create(
      {
        recipientId: new UniqueEntityId(raw.recipientId),
        title: '',
        content: raw.content,
        readAt: raw.readAt ?? undefined,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPersistence(
    entity: Notification,
  ): Prisma.NotificationUncheckedCreateInput {
    return {
      id: entity.id.toString(),
      recipientId: entity.recipientId.toString(),
      content: entity.content,
      readAt: entity.readAt ?? null,
      createdAt: entity.createdAt,
    }
  }
}
