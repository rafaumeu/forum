import { Optional } from '@/core/entities/types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Comment,
  CommentProps,
} from '@/domain/forum/enterprise/entities/comments'

export interface AnswerCommentProps extends CommentProps {
  answerId: UniqueEntityId
}
export class AnswerComment extends Comment<AnswerCommentProps> {
  get answerId() {
    return this.props.answerId
  }

  static create(
    props: Optional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )
    return answerComment
  }
}
