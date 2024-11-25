import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase
describe('Fetch recent questions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2023, 0, 20) }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2023, 0, 15),
      }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2023, 0, 10),
      }),
    )
    const { questions } = await sut.execute({
      page: 1,
    })
    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2023, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2023, 0, 15) }),
      expect.objectContaining({ createdAt: new Date(2023, 0, 10) }),
    ])
  })
  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion())
    }
    const { questions } = await sut.execute({
      page: 2,
    })
    expect(questions).toHaveLength(2)
  })
})
