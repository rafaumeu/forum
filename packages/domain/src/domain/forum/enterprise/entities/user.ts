import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/entities/types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Role, Roles } from '../value-objects/role'

export interface UserProps {
  name: string
  email: string
  password: string
  role: Role
  createdAt: Date
  updatedAt?: Date
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }

  get role() {
    return this.props.role
  }

  set role(role: Role) {
    this.props.role = role
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get isStudent() {
    return this.props.role.getValue() === Roles.STUDENT
  }

  get isInstructor() {
    return this.props.role.getValue() === Roles.INSTRUCTOR
  }

  static create(
    props: Optional<UserProps, 'createdAt' | 'role'>,
    id?: UniqueEntityId,
  ) {
    const user = new User(
      {
        ...props,
        role: props.role ?? Role.student(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return user
  }
}
