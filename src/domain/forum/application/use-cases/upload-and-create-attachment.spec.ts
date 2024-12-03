import { InvalidAttachmentTypeError } from '@/domain/forum/application/use-cases/errors/invalid-attachment-type'
import { UploadAndCreateAttachmentsUseCase } from '@/domain/forum/application/use-cases/upload-and-create-attachment'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments'
import { FakeUploader } from 'test/storage/fake-uploader'

let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let fakeUploader: FakeUploader

let sut: UploadAndCreateAttachmentsUseCase
describe('Upload and create attachment', () => {
  beforeEach(() => {
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    fakeUploader = new FakeUploader()

    sut = new UploadAndCreateAttachmentsUseCase(
      inMemoryAttachmentsRepository,
      fakeUploader,
    )
  })
  it('should be able to upload and create a new attachment', async () => {
    const result = await sut.execute({
      fileName: 'avatar.jpg',
      fileType: 'image/jpeg',
      body: Buffer.from('fake-body'),
    })
    expect(result.isRight()).toBe(true)

    expect(result.value).toEqual({
      attachment: inMemoryAttachmentsRepository.items[0],
    })
    expect(fakeUploader.upload).toHaveLength(1)
    expect(fakeUploader.uploads[0].fileName).toEqual('avatar.jpg')
  })
  it('should not be able to upload and create a new attachment with invalid file type', async () => {
    const result = await sut.execute({
      fileName: 'avatar.svg',
      fileType: 'image/svg',
      body: Buffer.from('fake-body'),
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidAttachmentTypeError)
  })
})
