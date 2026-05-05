import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Answer } from "./answer";
import { AnswerAttachmentList } from "./answer-attachment-list";
import { AnswerCreatedEvent } from "@/domain/forum/enterprise/events/answer-created-events";

describe("Answer entity", () => {
  it("should have a createdAt date when created", () => {
    const answer = Answer.create({
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: "Some content",
    });

    expect(answer.createdAt).toBeInstanceOf(Date);
  });

  it("should have undefined updatedAt when created", () => {
    const answer = Answer.create({
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: "Some content",
    });

    expect(answer.updatedAt).toBeUndefined();
  });

  it("should return an excerpt of the content", () => {
    const answer = Answer.create({
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: "a".repeat(150),
    });

    const excerpt = answer.excerpt;
    expect(excerpt.length).toBeLessThanOrEqual(123); // 120 chars + '...'
    expect(excerpt.endsWith("...")).toBe(true);
  });

  it("should update attachments via setter and touch updatedAt", () => {
    const answer = Answer.create({
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: "Some content",
    });

    expect(answer.updatedAt).toBeUndefined();

    const newAttachments = new AnswerAttachmentList();
    answer.attachments = newAttachments;

    expect(answer.attachments).toBe(newAttachments);
    expect(answer.updatedAt).toBeInstanceOf(Date);
  });

  it("should add a domain event when creating a new answer", () => {
    const answer = Answer.create({
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: "Some content",
    });

    expect(answer.domainEvents).toHaveLength(1);
    expect(answer.domainEvents[0]).toBeInstanceOf(AnswerCreatedEvent);
  });

  it("should not add domain event when creating answer with existing id", () => {
    const answer = Answer.create(
      {
        authorId: new UniqueEntityId(),
        questionId: new UniqueEntityId(),
        content: "Some content",
      },
      new UniqueEntityId(),
    );

    expect(answer.domainEvents).toHaveLength(0);
  });

  it("should update content via setter and touch updatedAt", () => {
    const answer = Answer.create({
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: "Old content",
    });

    expect(answer.updatedAt).toBeUndefined();

    answer.content = "New content";

    expect(answer.content).toBe("New content");
    expect(answer.updatedAt).toBeInstanceOf(Date);
  });
});
