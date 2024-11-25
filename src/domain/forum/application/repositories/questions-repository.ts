export interface QuestionsRepository {
  create(question: Question): Promise<void>
}
