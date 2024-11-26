import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answer-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase
describe('Delete question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    )
  })
  it('should be able to choose the question best answer', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: question.id,
    })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)
    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id)
  })
  it('should not be able to choose another user question best answer', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: question.id,
    })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)
    await expect(() =>
      sut.execute({
        answerId: answer.id.toString(),
        authorId: new UniqueEntityId('author-1').toString(),
      }),
    ).rejects.toBeInstanceOf(Error)
  })
  it('should not be able to choose a non existing answer', async () => {
    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)
    await expect(() =>
      sut.execute({
        answerId: new UniqueEntityId().toString(),
        authorId: question.authorId.toString(),
      }),
    ).rejects.toBeInstanceOf(Error)
  })
  it('should not be able to choose a non existing question', async () => {
    await expect(() =>
      sut.execute({
        answerId: new UniqueEntityId().toString(),
        authorId: new UniqueEntityId().toString(),
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
