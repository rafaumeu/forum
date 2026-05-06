import type { FastifyInstance } from 'fastify'

import { answerQuestionController } from '../controllers/answers/answer-question-controller'
import { editAnswerController } from '../controllers/answers/edit-answer-controller'
import { deleteAnswerController } from '../controllers/answers/delete-answer-controller'
import { fetchQuestionAnswersController } from '../controllers/answers/fetch-question-answers-controller'
import { chooseBestAnswerController } from '../controllers/answers/choose-best-answer-controller'

export async function answerRoutes(app: FastifyInstance) {
  fetchQuestionAnswersController(app)
  answerQuestionController(app)
  editAnswerController(app)
  deleteAnswerController(app)
  chooseBestAnswerController(app)
}
