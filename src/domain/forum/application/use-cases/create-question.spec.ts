import { Answer } from '@/domain/forum/enterprise/entities/answer'

import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'

const fakeQuestionsRepository: QuestionsRepository = {
  create: async (answer: Answer) => {
    console.log(answer)
  },
}
it('should be able to create a question', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)
  const { question } = await createQuestion.execute({
    authorId: '1',
    content: 'Test question',
    title: 'Test title',
  })
  expect(question.id).toBeTruthy()
})
