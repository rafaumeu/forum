import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Comment, CommentProps } from "./comments";

class ConcreteComment extends Comment<CommentProps> {
  static create(props: CommentProps, id?: UniqueEntityId) {
    return new ConcreteComment(props, id);
  }
}

describe("Comment entity", () => {
  it("should return updatedAt when set", () => {
    const updatedAt = new Date();
    const comment = ConcreteComment.create({
      authorId: new UniqueEntityId(),
      content: "Some content",
      createdAt: new Date(),
      updatedAt,
    });

    expect(comment.updatedAt).toEqual(updatedAt);
  });

  it("should return an excerpt of the content", () => {
    const comment = ConcreteComment.create({
      authorId: new UniqueEntityId(),
      content: "a".repeat(150),
      createdAt: new Date(),
    });

    const excerpt = comment.excerpt;
    expect(excerpt.length).toBeLessThanOrEqual(123);
    expect(excerpt.endsWith("...")).toBe(true);
  });

  it("should update content via setter and touch updatedAt", () => {
    const comment = ConcreteComment.create({
      authorId: new UniqueEntityId(),
      content: "Old content",
      createdAt: new Date(),
    });

    expect(comment.updatedAt).toBeUndefined();

    comment.content = "New content";

    expect(comment.content).toBe("New content");
    expect(comment.updatedAt).toBeInstanceOf(Date);
  });

  it("should have a createdAt date", () => {
    const createdAt = new Date();
    const comment = ConcreteComment.create({
      authorId: new UniqueEntityId(),
      content: "Some content",
      createdAt,
    });

    expect(comment.createdAt).toEqual(createdAt);
  });
});
