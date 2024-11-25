import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

interface EditQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
  questionId: string
}

interface EditQuestionUseCaseResponse {
  question: Question
}
export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}
  async execute({
    authorId,
    title,
    content,
    questionId,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)
    if (!question) {
      throw new Error('Question not found')
    }
    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }
    question.title = title
    question.content = content
    await this.questionsRepository.save(question)
    return {
      question,
    }
  }
}
