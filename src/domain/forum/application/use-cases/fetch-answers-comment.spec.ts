import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { FetchAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-answers-comment'

import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comment-repository'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase
describe('Fetch answer comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })
  it('should be able to fetch answers answer comments', async () => {
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    )
    const result = await sut.execute({
      answerCommentId: 'answer-1',
      page: 1,
    })
    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      const { answersComment } = result.value
      expect(answersComment).toHaveLength(3)
    }
  })
  it('should be able to fetch paginated answer answer comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityId(`answer-1`),
        }),
      )
    }
    const result = await sut.execute({
      answerCommentId: 'answer-1',
      page: 2,
    })
    expect(result.isRight()).toBe(true)

    expect(result.value?.answersComment).toHaveLength(2)
  })
})
