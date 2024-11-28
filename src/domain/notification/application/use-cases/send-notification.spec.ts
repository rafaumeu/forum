import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository

let sut: SendNotificationUseCase
describe('Send notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()

    sut = new SendNotificationUseCase(inMemoryNotificationsRepository)
  })
  it('should be able to send a notification', async () => {
    const result = await sut.execute({
      recipientId: '1',
      content: 'Test notification',
      title: 'Test title',
    })
    expect(result.isRight()).toBe(true)

    expect(result.value?.notification.id).toBeTruthy()
    expect(inMemoryNotificationsRepository.items[0].id).toEqual(
      result.value?.notification.id,
    )
  })
})
