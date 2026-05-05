import { FetchPopularQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-popular-questions'
import { makeAnswer } from '@/test/factories/make-answer'
import { makeQuestion } from '@/test/factories/make-question'
import { InMemoryAnswerAttachmentsRepository } from '@/test/repositories/in-memory-answer-attachment.repository'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answer-repository'
import { InMemoryQuestionAttachmentsRepository } from '@/test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let sut: FetchPopularQuestionsUseCase

describe('Fetch popular questions', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    sut = new FetchPopularQuestionsUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    )
  })

  it('should be able to fetch popular questions sorted by answer count', async () => {
    const question1 = makeQuestion()
    const question2 = makeQuestion()

    await inMemoryQuestionsRepository.create(question1)
    await inMemoryQuestionsRepository.create(question2)

    // question2 has 3 answers, question1 has 1 answer
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: question1.id }),
    )

    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: question2.id }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: question2.id }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: question2.id }),
    )

    const result = await sut.execute({ page: 1 })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.questions).toHaveLength(2)
      expect(result.value.questions[0].id).toEqual(question2.id)
      expect(result.value.questions[1].id).toEqual(question1.id)
    }
  })

  it('should return empty array when there are no questions', async () => {
    const result = await sut.execute({ page: 1 })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.questions).toHaveLength(0)
    }
  })
})
