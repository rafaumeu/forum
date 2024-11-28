import { Notification } from '@/domain/notification/enterprise/notification'

export interface NotificationsRepository {
  create(notification: Notification): Promise<void>
}
