import { Either, right } from '@/core/either'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comment-repository'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'
import { Injectable } from '@nestjs/common'

interface FetchQuestionCommentsUseCaseRequest {
  page: number
  questionId: string
}
type FetchQuestionCommentsUseCaseResponse = Either<
  null,
  {
    comments: CommentWithAuthor[]
  }
>
@Injectable()
export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const comments =
      await this.questionCommentsRepository.findManyByQuestionIdWithAuthor(
        questionId,
        {
          page,
        },
      )

    return right({ comments })
  }
}
