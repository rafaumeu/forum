import { randomUUID } from 'node:crypto'
import { Slug } from './value-objects/slug'

interface QuestionProps {
  title: string
  description: string
  authorId: string
  slug: Slug
}

export class Question {
  public id?: string
  public title: string
  public description: string
  public slug: Slug
  public authorId: string

  constructor(props: QuestionProps, id?: string) {
    this.id = id ?? randomUUID()
    this.title = props.title
    this.description = props.description
    this.authorId = props.authorId
    this.slug = props.slug
  }
}
