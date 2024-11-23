import { randomUUID } from 'node:crypto'

interface QuestionProps {
  title: string
  description: string
  authorId: string
}

export class Question {
  public id?: string
  public title: string
  public description: string
  public authorId: string

  constructor(props: QuestionProps, id?: string) {
    this.id = id ?? randomUUID()
    this.title = props.title
    this.description = props.description
    this.authorId = props.authorId
  }
}
