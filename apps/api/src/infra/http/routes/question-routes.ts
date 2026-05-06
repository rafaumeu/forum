import type { FastifyInstance } from 'fastify'

import { createQuestionController } from '../controllers/questions/create-question-controller'
import { editQuestionController } from '../controllers/questions/edit-question-controller'
import { deleteQuestionController } from '../controllers/questions/delete-question-controller'
import { getQuestionBySlugController } from '../controllers/questions/get-question-by-slug-controller'
import { fetchRecentQuestionsController } from '../controllers/questions/fetch-recent-questions-controller'
import { fetchPopularQuestionsController } from '../controllers/questions/fetch-popular-questions-controller'
import { searchQuestionsController } from '../controllers/questions/search-questions-controller'

export async function questionRoutes(app: FastifyInstance) {
  searchQuestionsController(app)
  fetchPopularQuestionsController(app)
  fetchRecentQuestionsController(app)
  getQuestionBySlugController(app)
  createQuestionController(app)
  editQuestionController(app)
  deleteQuestionController(app)
}
