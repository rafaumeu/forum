import { Attachment } from '@/domain/forum/enterprise/entities/attachment'

export abstract class AttachmentsRepository {
  abstract create(Attachment: Attachment): Promise<void>
}
