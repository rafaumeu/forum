import { Answer } from '../entities/answer'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}
export class AnswerQuestion {
  execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({
      content,
      authorId: instructorId,
      questionId,
    })
    return answer
  }
}
