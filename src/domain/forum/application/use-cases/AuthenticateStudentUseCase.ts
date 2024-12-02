import { left, right } from '@/core/either'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import {
  AuthenticateStudentUseCaseRequest,
  AuthenticateStudentUseCaseResponse,
} from '@/domain/forum/application/use-cases/authenticate-student'
import { WrongCredentialsError } from '@/domain/forum/application/use-cases/errors/wrong-credentials-error'
import { Encrypter } from '@/domain/notification/application/cryptography/encrypter'
import { HashComparer } from '@/domain/notification/application/cryptography/hash-comparer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthenticateStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
    const student = await this.studentsRepository.findByEmail(email)

    if (!student) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      student.password,
    )
    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }
    const accessToken = await this.encrypter.encrypt({
      sub: student.id.toString(),
    })
    return right({
      accessToken,
    })
  }
}
