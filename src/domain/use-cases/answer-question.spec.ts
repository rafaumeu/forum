import { expect, it } from 'vitest'
import { AnswerQuestion } from './answer-question'

it('should be able to answer', () => {
  const answerQuestion = new AnswerQuestion()
  const answer = answerQuestion.execute({
    instructorId: '1',
    questionId: '1',
    content: 'What is the meaning of life?',
  })
  expect(answer.content).toEqual('What is the meaning of life?')
})
