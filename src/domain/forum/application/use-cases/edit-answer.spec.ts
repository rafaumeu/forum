import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answer-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase
describe('Edit answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })
  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)
    await sut.execute({
      authorId: 'author-1',
      answerId: newAnswer.id.toValue(),
      content: 'New content',
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'New content',
    })
  })
  it('should not be able to edit a answer that does not exist', async () => {
    await expect(() =>
      sut.execute({
        authorId: 'author-1',
        answerId: 'answer-1',

        content: 'New content',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-2') },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)
    await expect(() =>
      sut.execute({
        authorId: 'author-1',
        answerId: newAnswer.id.toValue(),

        content: 'New content',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
