import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'

import { WrongCredentialsError } from '@/domain/forum/application/use-cases/errors/wrong-credentials-error'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeStudent } from 'test/factories/make-student'
import { InMemoryStudentsRepository } from '../../../../../test/repositories/in-memory-students-repository'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter

let sut: AuthenticateStudentUseCase
describe('Authenticate student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()

    sut = new AuthenticateStudentUseCase(
      inMemoryStudentsRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })
  it('should be able to authenticate a student', async () => {
    const student = makeStudent({
      email: 'fWl8o@example.com',
      password: await fakeHasher.hash('123456'),
    })
    inMemoryStudentsRepository.items.push(student)
    const result = await sut.execute({
      email: 'fWl8o@example.com',
      password: '123456',
    })
    expect(result.isRight()).toBe(true)

    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
  it('should return an error if student is not found', async () => {
    const result = await sut.execute({
      email: 'fWl8o@example.com',
      password: '123456',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
  it('should return an error if password is incorrect', async () => {
    const student = makeStudent({
      email: 'fWl8o@example.com',
      password: await fakeHasher.hash('123456'),
    })
    inMemoryStudentsRepository.items.push(student)
    const result = await sut.execute({
      email: 'fWl8o@example.com',
      password: '123123',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
})
