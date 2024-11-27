import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answer-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase
describe('Create answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })
  it('should be able to answer', async () => {
    const result = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'What is the meaning of life?',
    })
    expect(result.isRight()).toBe(true)

    expect(result.value?.answer.id).toBeTruthy()
    expect(inMemoryAnswersRepository.items[0].id).toEqual(
      result.value?.answer.id,
    )
  })
})
