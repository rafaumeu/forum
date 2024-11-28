import { OnAnserCreated } from '@/domain/notification/application/subscribers/on-answer-created'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerAttachmentsRepository } from '../../../../../test/repositories/in-memory-answer-attachment.repository'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answer-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
describe('On answer created', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
  })
  it('should send a notification when an answer is created', async () => {
    const answerCreated = new OnAnserCreated()
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)
  })
})
