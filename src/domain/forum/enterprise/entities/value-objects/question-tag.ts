export class QuestionTag {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(tag: string): QuestionTag {
    return new QuestionTag(tag)
  }

  static validate(tag: string): boolean {
    const regex = /^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$/
    return regex.test(tag) && tag.length >= 2 && tag.length <= 30
  }
}
