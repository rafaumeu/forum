import { WatchedList } from '@/core/entities/watched-list'
import { QuestionTag } from './value-objects/question-tag'

export class QuestionTagList extends WatchedList<QuestionTag> {
  compareItems(a: QuestionTag, b: QuestionTag): boolean {
    return a.value === b.value
  }
}
