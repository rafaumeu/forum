import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-event'
import { DomainEvents } from '@/core/events/domain-events'

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  public aggregate: CustomAggregate //eslint-disable-line
  constructor(aggregate: CustomAggregate) {
    this.ocurredAt = new Date()
    this.aggregate = aggregate
  }

  public getAggregateId(): UniqueEntityId {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('DomainEvents', () => {
  it('should be able to dispatch and listen to events', () => {
    const callBackSpy = vi.fn()
    DomainEvents.register(callBackSpy, CustomAggregateCreated.name) //eslint-disable-line

    const aggregate = CustomAggregate.create()
    expect(aggregate.domainEvents).toHaveLength(1)
    DomainEvents.dispatchEventsForAggregate(aggregate.id)
    expect(callBackSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
