import type { FastifyInstance } from 'fastify'

import { commentOnQuestionController } from '../controllers/comments/comment-on-question-controller'
import { commentOnAnswerController } from '../controllers/comments/comment-on-answer-controller'
import { deleteQuestionCommentController } from '../controllers/comments/delete-question-comment-controller'
import { deleteAnswerCommentController } from '../controllers/comments/delete-answer-comment-controller'
import { fetchQuestionCommentsController } from '../controllers/comments/fetch-question-comments-controller'
import { fetchAnswerCommentsController } from '../controllers/comments/fetch-answer-comments-controller'

export async function commentRoutes(app: FastifyInstance) {
  commentOnQuestionController(app)
  commentOnAnswerController(app)
  deleteQuestionCommentController(app)
  deleteAnswerCommentController(app)
  fetchQuestionCommentsController(app)
  fetchAnswerCommentsController(app)
}
