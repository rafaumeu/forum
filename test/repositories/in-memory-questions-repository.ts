import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  constructor(
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions = this.items

      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)
    return questions
  }

  async search(
    keyword: string,
    tags?: string[],
    page: number = 1,
  ): Promise<Question[]> {
    const lowerKeyword = keyword.toLowerCase()

    let filtered = this.items.filter((question) =>
      question.title.toLowerCase().includes(lowerKeyword),
    )

    if (tags && tags.length > 0) {
      filtered = filtered.filter((question) => {
        const questionTags = question.tags.getItems().map((t) => t.value)
        return tags.some((tag) => questionTags.includes(tag))
      })
    }

    return filtered.slice((page - 1) * 20, page * 20)
  }

  async findManyPopular(page: number): Promise<Question[]> {
    const questions = this.items.slice().sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime()
    })

    return questions.slice((page - 1) * 20, page * 20)
  }

  async save(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)
    this.items[itemIndex] = question
    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.slug.value === slug)
    if (!question) {
      return null
    }
    return question
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find((item) => item.id.toString() === id)
    if (!question) {
      return null
    }
    return question
  }

  async create(question: Question): Promise<void> {
    this.items.push(question)
    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async delete(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)
    this.items.splice(itemIndex, 1)
    this.questionAttachmentsRepository.deleteManyQuestionId(
      question.id.toString(),
    )
  }
}
