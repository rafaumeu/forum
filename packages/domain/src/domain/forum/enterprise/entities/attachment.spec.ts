import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Attachment } from "./attachment";

describe("Attachment entity", () => {
  it("should be able to create an attachment", () => {
    const attachment = Attachment.create({
      title: "Test attachment",
      link: "https://example.com/file.pdf",
    });

    expect(attachment.title).toBe("Test attachment");
    expect(attachment.link).toBe("https://example.com/file.pdf");
    expect(attachment.id).toBeInstanceOf(UniqueEntityId);
  });

  it("should be able to create an attachment with a custom id", () => {
    const customId = new UniqueEntityId("custom-id");
    const attachment = Attachment.create(
      {
        title: "Test attachment",
        link: "https://example.com/file.pdf",
      },
      customId,
    );

    expect(attachment.id.toString()).toBe("custom-id");
  });
});
