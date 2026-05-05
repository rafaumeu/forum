import { QuestionTag } from './question-tag'

describe('QuestionTag', () => {
  it('should validate a valid tag', () => {
    expect(QuestionTag.validate('typescript')).toBe(true)
    expect(QuestionTag.validate('react')).toBe(true)
    expect(QuestionTag.validate('node-js')).toBe(true)
    expect(QuestionTag.validate('abc')).toBe(true)
  })

  it('should invalidate a tag with uppercase letters', () => {
    expect(QuestionTag.validate('TypeScript')).toBe(false)
  })

  it('should invalidate a tag that is too short (less than 2 chars)', () => {
    expect(QuestionTag.validate('a')).toBe(false)
  })

  it('should invalidate a tag that is too long (more than 30 chars)', () => {
    expect(QuestionTag.validate('a'.repeat(31))).toBe(false)
  })

  it('should invalidate a tag that starts with a hyphen', () => {
    expect(QuestionTag.validate('-invalid')).toBe(false)
  })

  it('should invalidate a tag that ends with a hyphen', () => {
    expect(QuestionTag.validate('invalid-')).toBe(false)
  })

  it('should invalidate a tag with special characters', () => {
    expect(QuestionTag.validate('invalid@tag')).toBe(false)
  })

  it('should invalidate an empty tag', () => {
    expect(QuestionTag.validate('')).toBe(false)
  })

  it('should create a question tag with a value', () => {
    const tag = QuestionTag.create('typescript')
    expect(tag.value).toBe('typescript')
  })

  it('should validate a single alphanumeric character followed by valid chars', () => {
    expect(QuestionTag.validate('ab')).toBe(true)
  })
})
