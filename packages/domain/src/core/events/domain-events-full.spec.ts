import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-event'
import { DomainEvents } from '@/core/events/domain-events'

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)
    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))
    return aggregate
  }
}

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  public aggregate: CustomAggregate; // eslint-disable-line
  constructor(aggregate: CustomAggregate) {
    this.ocurredAt = new Date()
    this.aggregate = aggregate
  }

  public getAggregateId(): UniqueEntityId {
    return this.aggregate.id
  }
}

describe('DomainEvents full', () => {
  beforeEach(() => {
    DomainEvents.clearHandlers()
    DomainEvents.clearMarkedAggregates()
  })

  it('should be able to clear all handlers', () => {
    const callBackSpy = vi.fn()
    DomainEvents.register(callBackSpy, CustomAggregateCreated.name)

    DomainEvents.clearHandlers()

    const aggregate = CustomAggregate.create()
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    expect(callBackSpy).not.toHaveBeenCalled()
  })

  it('should be able to clear marked aggregates', () => {
    const aggregate = CustomAggregate.create()

    DomainEvents.clearMarkedAggregates()

    const callBackSpy = vi.fn()
    DomainEvents.register(callBackSpy, CustomAggregateCreated.name)

    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    expect(callBackSpy).not.toHaveBeenCalled()
  })

  it('should not dispatch events for unregistered aggregates', () => {
    const callBackSpy = vi.fn()
    DomainEvents.register(callBackSpy, CustomAggregateCreated.name)

    const unknownId = new UniqueEntityId()
    DomainEvents.dispatchEventsForAggregate(unknownId)

    expect(callBackSpy).not.toHaveBeenCalled()
  })

  it('should be able to register multiple handlers for the same event', () => {
    const callBackSpy1 = vi.fn()
    const callBackSpy2 = vi.fn()

    DomainEvents.register(callBackSpy1, CustomAggregateCreated.name)
    DomainEvents.register(callBackSpy2, CustomAggregateCreated.name)

    const aggregate = CustomAggregate.create()
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    expect(callBackSpy1).toHaveBeenCalled()
    expect(callBackSpy2).toHaveBeenCalled()
  })

  it('should not mark the same aggregate twice', () => {
    const aggregate = CustomAggregate.create()
    DomainEvents.markAggregateForDispatch(aggregate)
    DomainEvents.markAggregateForDispatch(aggregate)

    const callBackSpy = vi.fn()
    DomainEvents.register(callBackSpy, CustomAggregateCreated.name)

    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    expect(callBackSpy).toHaveBeenCalledTimes(1)
  })
})
