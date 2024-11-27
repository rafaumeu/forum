import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { FetchQuestionsAnswerUseCase } from '@/domain/forum/application/use-cases/fetch-question-answer'

import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answer-repository'
import { InMemoryAnswerAttachmentsRepository } from '../../../../../test/repositories/in-memory-answer-attachment.repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let sut: FetchQuestionsAnswerUseCase
describe('Fetch questions answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    sut = new FetchQuestionsAnswerUseCase(inMemoryAnswersRepository)
  })
  it('should be able to fetch questions answers', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('question-1') }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('question-1') }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('question-1') }),
    )
    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })
    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      const { answers } = result.value
      expect(answers).toHaveLength(3)
    }
  })
  it('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityId(`question-1`),
        }),
      )
    }
    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })
    expect(result.isRight()).toBe(true)

    expect(result.value?.answers).toHaveLength(2)
  })
})
