import { QuestionAttachmentsRepository } from '@forum/domain/src/domain/forum/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@forum/domain/src/domain/forum/enterprise/entities/question-attachment'

import { prisma } from '../prisma-service'
import { QuestionAttachmentPrismaMapper } from '../mappers/question-attachment-prisma-mapper'

export class PrismaQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {
    const questionAttachments = await prisma.questionAttachment.findMany({
      where: { questionId },
    })

    return questionAttachments.map(QuestionAttachmentPrismaMapper.toDomain)
  }

  async deleteManyQuestionId(questionId: string): Promise<void> {
    await prisma.questionAttachment.deleteMany({
      where: { questionId },
    })
  }
}
