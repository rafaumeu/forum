import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface StudentsProps {
  name: string
}
export class Student extends Entity<StudentsProps> {
  static create(props: StudentsProps, id?: UniqueEntityId) {
    const students = new Student(
      {
        ...props,
      },
      id
    )
    return students
  }
}
