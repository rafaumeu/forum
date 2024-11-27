import { Either, left, right } from '@/core/either'

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(10)
  }
  return left('error')
}
it('should to be return the success result', () => {
  const result = doSomething(true)
  expect(result.isRight()).toBe(true)
  expect(result.isLeft()).toBe(false)
})
it('should to be return the error result', () => {
  const result = doSomething(false)
  expect(result.isLeft()).toBe(true)
  expect(result.isRight()).toBe(false)
})
