import { UsersRepository } from '@forum/domain/src/domain/forum/application/repositories/users-repository'
import { User } from '@forum/domain/src/domain/forum/enterprise/entities/user'

import { prisma } from '../prisma-service'
import { UserPrismaMapper } from '../mappers/user-prisma-mapper'

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      return null
    }

    return UserPrismaMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return null
    }

    return UserPrismaMapper.toDomain(user)
  }

  async create(user: User): Promise<void> {
    const data = UserPrismaMapper.toPersistence(user)

    await prisma.user.create({ data })
  }

  async save(user: User): Promise<void> {
    const data = UserPrismaMapper.toPersistence(user)

    await prisma.user.update({
      where: { id: data.id },
      data,
    })
  }
}
