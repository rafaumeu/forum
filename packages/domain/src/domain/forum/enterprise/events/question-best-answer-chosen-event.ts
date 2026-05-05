import { DomainEvent } from '@/core/events/domain-event'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'

export class QuestionBestAnswerChosenEvent implements DomainEvent {
  public ocurredAt: Date
  public question: Question
  public bestAnswerId: UniqueEntityId

  constructor(question: Question, bestAnswerId: UniqueEntityId) {
    this.bestAnswerId = bestAnswerId
    this.question = question
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityId {
    return this.question.id
  }
}
