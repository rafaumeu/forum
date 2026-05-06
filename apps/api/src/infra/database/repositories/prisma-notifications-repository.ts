import { NotificationsRepository } from '@forum/domain/src/domain/notification/application/repositories/notification-repository'
import { Notification } from '@forum/domain/src/domain/notification/enterprise/notification'

import { prisma } from '../prisma-service'
import { NotificationPrismaMapper } from '../mappers/notification-prisma-mapper'

export class PrismaNotificationsRepository implements NotificationsRepository {
  async findById(id: string): Promise<Notification | null> {
    const notification = await prisma.notification.findUnique({
      where: { id },
    })

    if (!notification) {
      return null
    }

    return NotificationPrismaMapper.toDomain(notification)
  }

  async create(notification: Notification): Promise<void> {
    const data = NotificationPrismaMapper.toPersistence(notification)

    await prisma.notification.create({ data })
  }

  async save(notification: Notification): Promise<void> {
    const data = NotificationPrismaMapper.toPersistence(notification)

    await prisma.notification.update({
      where: { id: data.id },
      data,
    })
  }
}
