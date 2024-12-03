import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer'
import { CommentOnAnswersUseCase } from '@/domain/forum/application/use-cases/comment-on-answer'
import { CommentOnQuestionsUseCase } from '@/domain/forum/application/use-cases/comment-on-question'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer'
import { DeleteAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/delete-answer-comment'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question'
import { DeleteQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/delete-question-coment'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'
import { FetchAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-answers-comment'
import { FetchQuestionsAnswerUseCase } from '@/domain/forum/application/use-cases/fetch-question-answer'
import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comments'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { UploadAndCreateAttachmentsUseCase } from '@/domain/forum/application/use-cases/upload-and-create-attachment'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { AnswerQuestionController } from '@/infra/http/controllers/answer-question.controller'
import { AuthenticateController } from '@/infra/http/controllers/authenticate.controller'
import { ChooseQuestionBestAnswerController } from '@/infra/http/controllers/choose-question-best-answer.controller'
import { CommentOnAnswerController } from '@/infra/http/controllers/comment-on-answer.controller'
import { CommentOnQuestionController } from '@/infra/http/controllers/comment-on-question.controller'
import { CreateAccountController } from '@/infra/http/controllers/create-account.controller'
import { CreateQuestionController } from '@/infra/http/controllers/create-question.controller'
import { DeleteAnswerCommentController } from '@/infra/http/controllers/delete-answer-comment.controller'
import { DeleteAnswerController } from '@/infra/http/controllers/delete-answer.controller'
import { DeleteQuestionCommentController } from '@/infra/http/controllers/delete-question-comment.controller'
import { DeleteQuestionController } from '@/infra/http/controllers/delete-question.controller'
import { EditAnswerController } from '@/infra/http/controllers/edit-answer.controller'
import { EditQuestionController } from '@/infra/http/controllers/edit-question.controller'
import { FetchAnswersCommentsController } from '@/infra/http/controllers/fetch-answers-comment.controller'
import { FetchQuestionsAnswersController } from '@/infra/http/controllers/fetch-question-answer.controller'
import { FetchQuestionsCommentsController } from '@/infra/http/controllers/fetch-question-comments.controller'

import { FetchRecentQuestionsController } from '@/infra/http/controllers/fetch-recent-questions.controller'
import { GetQuestionBySlugController } from '@/infra/http/controllers/get-question-by-slug.controller'
import { UploadAttachmentController } from '@/infra/http/controllers/upload-attachment.controller'
import { StorageModule } from '@/infra/storage/storage.module'

import { Module } from '@nestjs/common'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    EditAnswerController,
    DeleteAnswerController,
    FetchQuestionsAnswersController,
    ChooseQuestionBestAnswerController,
    CommentOnQuestionController,
    DeleteQuestionCommentController,
    CommentOnAnswerController,
    DeleteAnswerCommentController,
    FetchQuestionsCommentsController,
    FetchAnswersCommentsController,
    UploadAttachmentController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    AuthenticateStudentUseCase,
    RegisterStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    AnswerQuestionUseCase,
    EditAnswerUseCase,
    DeleteAnswerUseCase,
    FetchQuestionsAnswerUseCase,
    ChooseQuestionBestAnswerUseCase,
    CommentOnQuestionsUseCase,
    DeleteQuestionCommentsUseCase,
    CommentOnAnswersUseCase,
    DeleteAnswerCommentsUseCase,
    FetchQuestionCommentsUseCase,
    FetchAnswerCommentsUseCase,
    UploadAndCreateAttachmentsUseCase,
  ],
})
export class HttpModule {}
