import { Entity } from '../../core/entities/entity'

interface StudentsProps {
  name: string
}
export class Student extends Entity<StudentsProps> {}
