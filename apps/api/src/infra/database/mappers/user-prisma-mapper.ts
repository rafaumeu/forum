import { User } from '@forum/domain/src/domain/forum/enterprise/entities/user'
import { UniqueEntityId } from '@forum/domain/src/core/entities/unique-entity-id'
import { Role, Roles } from '@forum/domain/src/domain/forum/enterprise/value-objects/role'

import { Prisma, User as PrismaUser } from '@prisma/client'

export class UserPrismaMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        role: Role.create(raw.role as Roles),
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPersistence(entity: User): Prisma.UserUncheckedCreateInput {
    return {
      id: entity.id.toString(),
      name: entity.name,
      email: entity.email,
      password: entity.password,
      role: entity.role.getValue() as Roles,
      avatar: undefined,
      createdAt: entity.createdAt,
    }
  }
}
