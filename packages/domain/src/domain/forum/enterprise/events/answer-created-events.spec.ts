import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswerCreatedEvent } from './answer-created-events'

describe('AnswerCreatedEvent', () => {
  it('should return the answer aggregate id', () => {
    const answerId = new UniqueEntityId('answer-id-1')
    const answer = Answer.create(
      {
        authorId: new UniqueEntityId(),
        questionId: new UniqueEntityId(),
        content: 'Some content',
      },
      answerId,
    )

    const event = new AnswerCreatedEvent(answer)

    expect(event.getAggregateId()).toEqual(answerId)
    expect(event.ocurredAt).toBeInstanceOf(Date)
    expect(event.answer).toBe(answer)
  })
})
