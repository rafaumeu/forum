import { Entity } from '@/core/entities/entity'
import { DomainEvent } from '@/core/events/domain-event'
import { DomainEvents } from '@/core/events/domain-events'

export abstract class AggregateRoot<Props> extends Entity<Props> {
  private _domainEvents: DomainEvent[] = []
  get domainEvents(): DomainEvent[] {
    return this._domainEvents
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent)

    DomainEvents.markAggregateForDispatch(this)
  }

  public clearEvents(): void {
    this._domainEvents = []
  }
}
