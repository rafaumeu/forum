import { Optional } from '@/core/entities/types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Comment,
  CommentProps,
} from '@/domain/forum/enterprise/entities/comments'

export interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityId
}
export class QuestionComment extends Comment<QuestionCommentProps> {
  get questionId() {
    return this.props.questionId
  }

  static create(
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )
    return questionComment
  }
}
