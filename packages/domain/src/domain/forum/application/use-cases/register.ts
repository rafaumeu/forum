import { Either, left, right } from '@/core/either'
import { UsersRepository } from '@/domain/forum/application/repositories/users-repository'
import { User } from '@/domain/forum/enterprise/entities/user'
import { Role, Roles } from '@/domain/forum/enterprise/value-objects/role'
import { hashSync } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  role?: Roles
}

type RegisterUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: User
  }
>

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    role,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError())
    }

    const hashedPassword = hashSync(password, 8)

    const user = User.create({
      name,
      email,
      password: hashedPassword,
      role: role ? Role.create(role) : undefined,
    })

    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}
