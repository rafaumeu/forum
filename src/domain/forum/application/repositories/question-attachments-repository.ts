import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export interface QuestionAttachmentsRepository {
  findManyByQuestionsId(questionId: string): Promise<QuestionAttachment[]>
}
