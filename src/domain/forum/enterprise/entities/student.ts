import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface StudentsProps {
  name: string
  email: string
  password: string
}
export class Student extends Entity<StudentsProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  static create(props: StudentsProps, id?: UniqueEntityId) {
    const students = new Student(
      {
        ...props,
      },
      id,
    )
    return students
  }
}
