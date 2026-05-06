import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  User,
  UserProps,
} from '@/domain/forum/enterprise/entities/user'
import { faker } from '@faker-js/faker'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityId,
) {
  const user = User.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )
  return user
}
