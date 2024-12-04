import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'
import { PrismaQuestionAttachmentMapper } from '@/infra/database/mappers/prisma-question-attachment-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
@Injectable()
export class PrismaQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}
  async createMany(attachments: QuestionAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return
    }

    const data = PrismaQuestionAttachmentMapper.toPrismaUpdateMany(attachments)
    await this.prisma.attachment.updateMany(data)
  }

  async deleteMany(attachments: QuestionAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return
    }
    const attachmentsIds = attachments.map((attachment) =>
      attachment.id.toString(),
    )
    await this.prisma.attachment.deleteMany({
      where: {
        id: {
          in: attachmentsIds,
        },
      },
    })
  }

  async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {
    const questionAttachments = await this.prisma.attachment.findMany({
      where: { questionId },
    })
    return questionAttachments.map(PrismaQuestionAttachmentMapper.toDomain)
  }

  async deleteManyQuestionId(questionId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: { questionId },
    })
  }
}
