import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'

import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryStudentsRepository } from '../../../../../test/repositories/in-memory-students-repository'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher

let sut: RegisterStudentUseCase
describe('Register student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()

    sut = new RegisterStudentUseCase(inMemoryStudentsRepository, fakeHasher)
  })
  it('should be able to register a new student', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'fWl8o@example.com',
      password: '123456',
    })
    expect(result.isRight()).toBe(true)

    expect(result.value).toEqual({
      student: inMemoryStudentsRepository.items[0],
    })
  })
  it('should hash student password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'fWl8o@example.com',
      password: '123456',
    })
    const hashedPassword = await fakeHasher.hash('123456')
    expect(inMemoryStudentsRepository.items[0].password).toEqual(hashedPassword)
  })
})
