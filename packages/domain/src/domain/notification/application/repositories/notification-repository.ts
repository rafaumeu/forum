import { Notification } from '@/domain/notification/enterprise/notification'

export interface NotificationsRepository {
  findById(id: string): Promise<Notification | null>
  save(notification: Notification): Promise<void>
  create(notification: Notification): Promise<void>
}
