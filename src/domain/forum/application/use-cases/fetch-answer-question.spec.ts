import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { FetchQuestionsAnswerUseCase } from '@/domain/forum/application/use-cases/fetch-questions-answers'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answer-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionsAnswerUseCase
describe('Fetch questions answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
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
    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })
    expect(answers).toHaveLength(3)
  })
  it('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityId(`question-1`),
        }),
      )
    }
    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })
    expect(answers).toHaveLength(2)
  })
})
