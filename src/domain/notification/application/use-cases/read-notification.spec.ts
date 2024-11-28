import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found-error'
import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notifications'
import { makeNotification } from 'test/factories/make-notification'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository

let sut: ReadNotificationUseCase
describe('Read notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()

    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository)
  })
  it('should be able to read a notification', async () => {
    const notification = makeNotification()
    await inMemoryNotificationsRepository.create(notification)
    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    })
    expect(result.isRight()).toBe(true)

    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
      expect.any(Date),
    )
  })
  it('should not be able to read a notification if it does not exist', async () => {
    const notificationId = 'fake-notification-id'
    const result = await sut.execute({
      recipientId: 'fake-recipient-id',
      notificationId,
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toEqual(new ResourceNotFoundError())
  })
  it('should not be able to read a notification from another user', async () => {
    const notification = makeNotification()
    await inMemoryNotificationsRepository.create(notification)
    const result = await sut.execute({
      recipientId: 'fake-recipient-id',
      notificationId: notification.id.toString(),
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toEqual(new NotAllowedError())
  })
})
