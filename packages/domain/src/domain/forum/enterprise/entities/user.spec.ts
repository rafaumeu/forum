import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Role, Roles } from '../value-objects/role'
import { User } from './user'

describe('User entity', () => {
  it('should be able to create a user with all props', () => {
    const user = User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    expect(user.name).toBe('John Doe')
    expect(user.email).toBe('john@example.com')
    expect(user.password).toBe('123456')
    expect(user.createdAt).toBeInstanceOf(Date)
  })

  it('should default role to STUDENT', () => {
    const user = User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    expect(user.role.getValue()).toBe(Roles.STUDENT)
    expect(user.isStudent).toBe(true)
    expect(user.isInstructor).toBe(false)
  })

  it('should be able to create a user with INSTRUCTOR role', () => {
    const user = User.create({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: '123456',
      role: Role.instructor(),
    })

    expect(user.role.getValue()).toBe(Roles.INSTRUCTOR)
    expect(user.isStudent).toBe(false)
    expect(user.isInstructor).toBe(true)
  })

  it('should default createdAt to current date', () => {
    const before = new Date()
    const user = User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })
    const after = new Date()

    expect(user.createdAt.getTime()).toBeGreaterThanOrEqual(before.getTime())
    expect(user.createdAt.getTime()).toBeLessThanOrEqual(after.getTime())
  })

  it('should be able to create a user with custom createdAt', () => {
    const customDate = new Date('2023-01-01')
    const user = User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      createdAt: customDate,
    })

    expect(user.createdAt).toEqual(customDate)
  })

  it('should be able to create a user with a custom id', () => {
    const customId = new UniqueEntityId('custom-user-id')
    const user = User.create(
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
      },
      customId,
    )

    expect(user.id.toString()).toBe('custom-user-id')
  })

  it('should be able to update name via setter', () => {
    const user = User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    user.name = 'Jane Doe'

    expect(user.name).toBe('Jane Doe')
  })

  it('should be able to update email via setter', () => {
    const user = User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    user.email = 'jane@example.com'

    expect(user.email).toBe('jane@example.com')
  })

  it('should be able to update password via setter', () => {
    const user = User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    user.password = 'newpassword'

    expect(user.password).toBe('newpassword')
  })

  it('should be able to update role via setter', () => {
    const user = User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    user.role = Role.instructor()

    expect(user.role.getValue()).toBe(Roles.INSTRUCTOR)
    expect(user.isInstructor).toBe(true)
  })

  it('should return undefined for updatedAt when not set', () => {
    const user = User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    expect(user.updatedAt).toBeUndefined()
  })

  it('should be able to create a user with updatedAt', () => {
    const updatedAt = new Date('2023-06-15')
    const user = User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      updatedAt,
    })

    expect(user.updatedAt).toEqual(updatedAt)
  })

  it('should equals by id', () => {
    const id = new UniqueEntityId()
    const user1 = User.create(
      { name: 'John', email: 'john@example.com', password: '123456' },
      id,
    )
    const user2 = User.create(
      { name: 'John', email: 'john@example.com', password: '123456' },
      id,
    )

    expect(user1.equals(user2)).toBe(true)
  })

  it('should equals itself', () => {
    const user = User.create({
      name: 'John',
      email: 'john@example.com',
      password: '123456',
    })

    expect(user.equals(user)).toBe(true)
  })

  it('should not equal different id', () => {
    const user1 = User.create({
      name: 'John',
      email: 'john@example.com',
      password: '123456',
    })
    const user2 = User.create({
      name: 'John',
      email: 'john@example.com',
      password: '123456',
    })

    expect(user1.equals(user2)).toBe(false)
  })
})
