import { Either, left, right } from '@/core/either'
import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments-repository'
import { Uploader } from '@/domain/forum/application/storage/uploader'
import { InvalidAttachmentTypeError } from '@/domain/forum/application/use-cases/errors/invalid-attachment-type'

import { Attachment } from '@/domain/forum/enterprise/entities/attachment'
import { Injectable } from '@nestjs/common'

interface UploadAndCreateAttachmentsUseCaseRequest {
  fileName: string
  fileType: string
  body: Buffer
}

type UploadAndCreateAttachmentsUseCaseResponse = Either<
  InvalidAttachmentTypeError,
  {
    attachment: Attachment
  }
>
@Injectable()
export class UploadAndCreateAttachmentsUseCase {
  constructor(
    private attachmentsRepository: AttachmentsRepository,
    private uploader: Uploader,
  ) {}

  async execute({
    fileName,
    fileType,
    body,
  }: UploadAndCreateAttachmentsUseCaseRequest): Promise<UploadAndCreateAttachmentsUseCaseResponse> {
    if (!/^(image\/(jpeg|png|jpg|pdf))$/.test(fileType)) {
      return left(new InvalidAttachmentTypeError(fileType))
    }

    const { url } = await this.uploader.upload({
      fileName,
      fileType,
      body,
    })

    const attachment = Attachment.create({
      title: fileName,
      url,
    })
    await this.attachmentsRepository.create(attachment)
    return right({
      attachment,
    })
  }
}
