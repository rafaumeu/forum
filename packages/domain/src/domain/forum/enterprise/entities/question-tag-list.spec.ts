import { QuestionTag } from './value-objects/question-tag'
import { QuestionTagList } from './question-tag-list'

describe('QuestionTagList', () => {
  it('should compare items by tag value', () => {
    const tag1 = QuestionTag.create('typescript')
    const tag2 = QuestionTag.create('react')
    const tag3 = QuestionTag.create('typescript')

    const list = new QuestionTagList([tag1])
    list.add(tag2)

    expect(list.getItems()).toHaveLength(2)

    list.add(tag3)

    expect(list.getItems()).toHaveLength(2)
  })

  it('should remove items by tag value', () => {
    const tag1 = QuestionTag.create('typescript')
    const tag2 = QuestionTag.create('react')

    const list = new QuestionTagList([tag1, tag2])
    list.remove(tag1)

    expect(list.getItems()).toHaveLength(1)
    expect(list.getItems()[0].value).toBe('react')
  })
})
