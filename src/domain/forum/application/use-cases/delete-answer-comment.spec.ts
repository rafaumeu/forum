import { DeleteAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/delete-answer-comment'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comment-repository'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentsUseCase
describe('Delete comment on answer', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })
  it('should be able to delete comment on answer', async () => {
    const answerComment = makeAnswerComment()

    await inMemoryAnswerCommentsRepository.create(answerComment)
    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })
  it('should not be able to delete comment on answer that does not exist', async () => {
    await expect(() =>
      sut.execute({
        answerCommentId: 'answer-comment-1',
        authorId: 'author-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
  it('should not be able to delete comment on answer that is not from the same author', async () => {
    const answerComment = makeAnswerComment()
    await inMemoryAnswerCommentsRepository.create(answerComment)
    await expect(() =>
      sut.execute({
        answerCommentId: answerComment.id.toString(),
        authorId: 'author-2',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
