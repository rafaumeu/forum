import { Entity } from '../../core/entities/entity'
import { Slug } from './value-objects/slug'

interface QuestionProps {
  title: string
  description: string
  authorId: string
  slug: Slug
}

export class Question extends Entity<QuestionProps> {}
