import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase
describe('Edit question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)
    await sut.execute({
      authorId: 'author-1',
      questionId: newQuestion.id.toValue(),
      title: 'New title',
      content: 'New content',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'New title',
      content: 'New content',
    })
  })
  it('should not be able to edit a question that does not exist', async () => {
    await expect(() =>
      sut.execute({
        authorId: 'author-1',
        questionId: 'question-1',
        title: 'New title',
        content: 'New content',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-2') },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)
    await expect(() =>
      sut.execute({
        authorId: 'author-1',
        questionId: newQuestion.id.toValue(),
        title: 'New title',
        content: 'New content',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
