import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Instructor } from "./instructor";

describe("Instructor entity", () => {
  it("should be able to create an instructor", () => {
    const instructor = Instructor.create({ name: "John Doe" });

    expect(instructor.id).toBeInstanceOf(UniqueEntityId);
  });

  it("should be able to create an instructor with a custom id", () => {
    const customId = new UniqueEntityId("custom-instructor-id");
    const instructor = Instructor.create({ name: "Jane Doe" }, customId);

    expect(instructor.id.toString()).toBe("custom-instructor-id");
  });
});
