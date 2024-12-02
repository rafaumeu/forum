import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export abstract class QuestionAttachmentsRepository {
  abstract findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]>

  abstract deleteManyQuestionId(questionId: string): Promise<void>
}
