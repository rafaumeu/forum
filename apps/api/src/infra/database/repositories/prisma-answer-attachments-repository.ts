import { AnswerAttachmentsRepository } from '@forum/domain/src/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@forum/domain/src/domain/forum/enterprise/entities/answer-attachment'

import { prisma } from '../prisma-service'
import { AnswerAttachmentPrismaMapper } from '../mappers/answer-attachment-prisma-mapper'

export class PrismaAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    const answerAttachments = await prisma.answerAttachment.findMany({
      where: { answerId },
    })

    return answerAttachments.map(AnswerAttachmentPrismaMapper.toDomain)
  }

  async deleteManyAnswerId(answerId: string): Promise<void> {
    await prisma.answerAttachment.deleteMany({
      where: { answerId },
    })
  }
}
