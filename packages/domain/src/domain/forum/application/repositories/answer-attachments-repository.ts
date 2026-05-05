import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export interface AnswerAttachmentsRepository {
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>
  deleteManyAnswerId(answerId: string): Promise<void>
}
