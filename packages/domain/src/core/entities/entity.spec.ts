import { Entity } from './entity'
import { UniqueEntityId } from './unique-entity-id'

class ConcreteEntity extends Entity<{ name: string }> {
  static create(props: { name: string }, id?: UniqueEntityId) {
    return new ConcreteEntity(props, id)
  }
}

describe('Entity', () => {
  it('should return true when comparing the same instance', () => {
    const id = new UniqueEntityId()
    const entity = ConcreteEntity.create({ name: 'test' }, id)

    expect(entity.equals(entity)).toBe(true)
  })

  it('should return true when comparing entities with the same id', () => {
    const id = new UniqueEntityId('same-id')
    const entity1 = ConcreteEntity.create({ name: 'test1' }, id)
    const entity2 = ConcreteEntity.create({ name: 'test2' }, id)

    expect(entity1.equals(entity2)).toBe(true)
  })

  it('should return false when comparing entities with different ids', () => {
    const entity1 = ConcreteEntity.create({ name: 'test1' })
    const entity2 = ConcreteEntity.create({ name: 'test2' })

    expect(entity1.equals(entity2)).toBe(false)
  })
})
