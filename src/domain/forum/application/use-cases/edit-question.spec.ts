import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found-error'
import { makeQuestion } from 'test/factories/make-question'
import { makeQuestionAttachment } from 'test/factories/make-question-attachment'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: EditQuestionUseCase
describe('Edit question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    sut = new EditQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionAttachmentsRepository,
    )
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
      attachmentsIds: ['1', '3'],
    })
    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityId('2'),
      }),
    )
    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'New title',
      content: 'New content',
    })
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('3') }),
    ])
  })
  it('should not be able to edit a question that does not exist', async () => {
    const result = await sut.execute({
      authorId: 'author-1',
      questionId: 'question-1',
      title: 'New title',
      content: 'New content',
      attachmentsIds: ['1', '3'],
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-2') },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)
    const result = await sut.execute({
      authorId: 'author-1',
      questionId: newQuestion.id.toValue(),
      title: 'New title',
      content: 'New content',
      attachmentsIds: ['1', '3'],
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
