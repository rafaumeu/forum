import { Answer } from '@/domain/entities/answer'

import { AnswersRepository } from '@/domain/repositories/answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    console.log(answer)
  },
}
it('should be able to answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)
  const answer = await answerQuestion.execute({
    instructorId: '1',
    questionId: '1',
    content: 'What is the meaning of life?',
  })
  expect(answer.content).toEqual('What is the meaning of life?')
})
