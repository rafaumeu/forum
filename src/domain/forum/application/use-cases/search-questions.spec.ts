import { QuestionTag } from '@/domain/forum/enterprise/entities/value-objects/question-tag'
import { QuestionTagList } from '@/domain/forum/enterprise/entities/question-tag-list'
import { SearchQuestionsUseCase } from '@/domain/forum/application/use-cases/search-questions'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionAttachmentsRepository } from '../../../../../test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionsAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: SearchQuestionsUseCase

describe('Search questions', () => {
  beforeEach(() => {
    inMemoryQuestionsAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionsAttachmentsRepository,
    )
    sut = new SearchQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to search questions by title keyword', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({ title: 'How to use TypeScript generics?' }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ title: 'React hooks best practices' }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ title: 'TypeScript vs JavaScript performance' }),
    )

    const result = await sut.execute({
      keyword: 'typescript',
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.questions).toHaveLength(2)
      expect(result.value.questions).toEqual([
        expect.objectContaining({
          title: 'How to use TypeScript generics?',
        }),
        expect.objectContaining({
          title: 'TypeScript vs JavaScript performance',
        }),
      ])
    }
  })

  it('should be able to search questions by title keyword case-insensitively', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({ title: 'Node.js Authentication Tutorial' }),
    )

    const result = await sut.execute({
      keyword: 'node.js',
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.questions).toHaveLength(1)
    }
  })

  it('should be able to search questions by tags', async () => {
    const question1 = makeQuestion({ title: 'Question about React' })
    question1.tags = new QuestionTagList([
      QuestionTag.create('react'),
      QuestionTag.create('frontend'),
    ])
    await inMemoryQuestionsRepository.create(question1)

    const question2 = makeQuestion({ title: 'Question about Node' })
    question2.tags = new QuestionTagList([
      QuestionTag.create('nodejs'),
      QuestionTag.create('backend'),
    ])
    await inMemoryQuestionsRepository.create(question2)

    const question3 = makeQuestion({ title: 'Question about Python' })
    question3.tags = new QuestionTagList([QuestionTag.create('python')])
    await inMemoryQuestionsRepository.create(question3)

    const result = await sut.execute({
      keyword: 'question',
      tags: ['react', 'backend'],
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.questions).toHaveLength(2)
      expect(result.value.questions).toEqual([
        expect.objectContaining({ title: 'Question about React' }),
        expect.objectContaining({ title: 'Question about Node' }),
      ])
    }
  })

  it('should return empty array when no questions match the keyword', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({ title: 'React hooks best practices' }),
    )

    const result = await sut.execute({
      keyword: 'python',
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.questions).toHaveLength(0)
    }
  })

  it('should be able to fetch paginated search results', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(
        makeQuestion({ title: `TypeScript question ${i}` }),
      )
    }

    const result = await sut.execute({
      keyword: 'typescript',
      page: 2,
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.questions).toHaveLength(2)
    }
  })

  it('should be able to search questions by tags only (without keyword match filter)', async () => {
    const question1 = makeQuestion({ title: 'Advanced CSS techniques' })
    question1.tags = new QuestionTagList([QuestionTag.create('css')])
    await inMemoryQuestionsRepository.create(question1)

    const question2 = makeQuestion({ title: 'Learning Flexbox' })
    question2.tags = new QuestionTagList([QuestionTag.create('css')])
    await inMemoryQuestionsRepository.create(question2)

    const result = await sut.execute({
      keyword: '',
      tags: ['css'],
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.questions).toHaveLength(2)
    }
  })
})
