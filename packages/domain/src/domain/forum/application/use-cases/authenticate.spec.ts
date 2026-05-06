import { hashSync } from 'bcryptjs'
import { describe, expect, it, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryUsersRepository } from '@/test/repositories/in-memory-users-repository'
import { makeUser } from '@/test/factories/make-user'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(inMemoryUsersRepository)
  })

  it('should be able to authenticate', async () => {
    const plainPassword = '123456'
    const hashedPassword = hashSync(plainPassword, 8)

    const user = makeUser({
      email: 'johndoe@example.com',
      password: hashedPassword,
    })

    await inMemoryUsersRepository.create(user)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: plainPassword,
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.user.email).toBe('johndoe@example.com')
    }
  })

  it('should not be able to authenticate with wrong email', async () => {
    const plainPassword = '123456'
    const hashedPassword = hashSync(plainPassword, 8)

    const user = makeUser({
      email: 'johndoe@example.com',
      password: hashedPassword,
    })

    await inMemoryUsersRepository.create(user)

    const result = await sut.execute({
      email: 'wrong@example.com',
      password: plainPassword,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const plainPassword = '123456'
    const hashedPassword = hashSync(plainPassword, 8)

    const user = makeUser({
      email: 'johndoe@example.com',
      password: hashedPassword,
    })

    await inMemoryUsersRepository.create(user)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: 'wrong-password',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
})
