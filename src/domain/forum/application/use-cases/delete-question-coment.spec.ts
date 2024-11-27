import { DeleteQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/delete-question-coment'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comment-repository-in-memory'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentsUseCase
describe('Delete comment on question', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new DeleteQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })
  it('should be able to delete comment on question', async () => {
    const questionComment = makeQuestionComment()

    await inMemoryQuestionCommentsRepository.create(questionComment)
    await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
    })

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
  })
  it('should not be able to delete comment on question that does not exist', async () => {
    await expect(() =>
      sut.execute({
        questionCommentId: 'question-comment-1',
        authorId: 'author-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
  it('should not be able to delete comment on question that is not from the same author', async () => {
    const questionComment = makeQuestionComment()
    await inMemoryQuestionCommentsRepository.create(questionComment)
    await expect(() =>
      sut.execute({
        questionCommentId: questionComment.id.toString(),
        authorId: 'author-2',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
