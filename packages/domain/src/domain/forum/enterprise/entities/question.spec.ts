import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from './question'
import { QuestionAttachmentList } from './question-attachment-list'
import { QuestionTagList } from './question-tag-list'
import { QuestionTag } from './value-objects/question-tag'
import { Slug } from './value-objects/slug'
import { QuestionBestAnswerChosenEvent } from '@/domain/forum/enterprise/events/question-best-answer-chosen-event'

describe('Question entity', () => {
  it('should return true for inNew when created within 3 days', () => {
    const question = Question.create({
      authorId: new UniqueEntityId(),
      title: 'New question',
      content: 'Content',
    })

    expect(question.inNew).toBe(true)
  })

  it('should return false for inNew when created more than 3 days ago', () => {
    const oldDate = new Date()
    oldDate.setDate(oldDate.getDate() - 5)

    const question = Question.create({
      authorId: new UniqueEntityId(),
      title: 'Old question',
      content: 'Content',
      createdAt: oldDate,
    })

    expect(question.inNew).toBe(false)
  })

  it('should set bestAnswerId and dispatch event when setting a new best answer', () => {
    const question = Question.create({
      authorId: new UniqueEntityId(),
      title: 'Question title',
      content: 'Content',
    })

    const bestAnswerId = new UniqueEntityId()
    question.bestAnswerId = bestAnswerId

    expect(question.bestAnswerId).toEqual(bestAnswerId)
    expect(question.domainEvents).toHaveLength(1)
    expect(question.domainEvents[0]).toBeInstanceOf(
      QuestionBestAnswerChosenEvent,
    )
    expect(question.updatedAt).toBeInstanceOf(Date)
  })

  it('should not dispatch event when setting the same bestAnswerId', () => {
    const bestAnswerId = new UniqueEntityId()
    const question = Question.create({
      authorId: new UniqueEntityId(),
      title: 'Question title',
      content: 'Content',
      bestAnswerId,
    })

    question.bestAnswerId = bestAnswerId

    expect(question.domainEvents).toHaveLength(0)
  })

  it('should not update bestAnswerId when set to undefined', () => {
    const bestAnswerId = new UniqueEntityId()
    const question = Question.create({
      authorId: new UniqueEntityId(),
      title: 'Question title',
      content: 'Content',
      bestAnswerId,
    })

    question.bestAnswerId = undefined

    expect(question.bestAnswerId).toEqual(bestAnswerId)
  })

  it('should update title and slug via title setter', () => {
    const question = Question.create({
      authorId: new UniqueEntityId(),
      title: 'Old title',
      content: 'Content',
    })

    question.title = 'New title for my question'

    expect(question.title).toBe('New title for my question')
    expect(question.slug.value).toBe('new-title-for-my-question')
    expect(question.updatedAt).toBeInstanceOf(Date)
  })

  it('should return an excerpt of the content', () => {
    const question = Question.create({
      authorId: new UniqueEntityId(),
      title: 'Question title',
      content: 'a'.repeat(150),
    })

    const excerpt = question.excerpt
    expect(excerpt.length).toBeLessThanOrEqual(123)
    expect(excerpt.endsWith('...')).toBe(true)
  })

  it('should update attachments via setter and touch updatedAt', () => {
    const question = Question.create({
      authorId: new UniqueEntityId(),
      title: 'Question title',
      content: 'Content',
    })

    expect(question.updatedAt).toBeUndefined()

    const newAttachments = new QuestionAttachmentList()
    question.attachments = newAttachments

    expect(question.attachments).toBe(newAttachments)
    expect(question.updatedAt).toBeInstanceOf(Date)
  })

  it('should update tags via setter and touch updatedAt', () => {
    const question = Question.create({
      authorId: new UniqueEntityId(),
      title: 'Question title',
      content: 'Content',
    })

    expect(question.updatedAt).toBeUndefined()

    const newTags = new QuestionTagList([QuestionTag.create('typescript')])
    question.tags = newTags

    expect(question.tags).toBe(newTags)
    expect(question.updatedAt).toBeInstanceOf(Date)
  })

  it('should create a slug from title when slug is not provided', () => {
    const question = Question.create({
      authorId: new UniqueEntityId(),
      title: 'My Test Question',
      content: 'Content',
    })

    expect(question.slug.value).toBe('my-test-question')
  })

  it('should use provided slug when available', () => {
    const question = Question.create({
      authorId: new UniqueEntityId(),
      title: 'My Test Question',
      content: 'Content',
      slug: Slug.create('custom-slug'),
    })

    expect(question.slug.value).toBe('custom-slug')
  })
})
