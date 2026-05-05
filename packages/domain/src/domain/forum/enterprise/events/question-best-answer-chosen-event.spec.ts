import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { QuestionBestAnswerChosenEvent } from "./question-best-answer-chosen-event";

describe("QuestionBestAnswerChosenEvent", () => {
  it("should return the question aggregate id", () => {
    const questionId = new UniqueEntityId("question-id-1");
    const bestAnswerId = new UniqueEntityId("best-answer-id-1");

    const question = Question.create(
      {
        authorId: new UniqueEntityId(),
        title: "Some title",
        content: "Some content",
      },
      questionId,
    );

    const event = new QuestionBestAnswerChosenEvent(question, bestAnswerId);

    expect(event.getAggregateId()).toEqual(questionId);
    expect(event.ocurredAt).toBeInstanceOf(Date);
    expect(event.question).toBe(question);
    expect(event.bestAnswerId).toEqual(bestAnswerId);
  });
});
