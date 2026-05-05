import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Student } from "./student";

describe("Student entity", () => {
  it("should be able to create a student", () => {
    const student = Student.create({ name: "John Doe" });

    expect(student.id).toBeInstanceOf(UniqueEntityId);
  });

  it("should be able to create a student with a custom id", () => {
    const customId = new UniqueEntityId("custom-student-id");
    const student = Student.create({ name: "Jane Doe" }, customId);

    expect(student.id.toString()).toBe("custom-student-id");
  });
});
