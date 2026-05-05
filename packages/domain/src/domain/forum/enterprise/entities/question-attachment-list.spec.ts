import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionAttachment } from "./question-attachment";
import { QuestionAttachmentList } from "./question-attachment-list";

describe("QuestionAttachmentList", () => {
  it("should compare items by attachmentId", () => {
    const list = new QuestionAttachmentList();

    const attachmentId1 = new UniqueEntityId("attachment-1");
    const attachmentId2 = new UniqueEntityId("attachment-2");
    const questionId = new UniqueEntityId("question-1");

    const qa1 = QuestionAttachment.create({
      attachmentId: attachmentId1,
      questionId,
    });
    const qa2 = QuestionAttachment.create({
      attachmentId: attachmentId2,
      questionId,
    });

    list.add(qa1);
    list.add(qa2);

    expect(list.getItems()).toHaveLength(2);
  });

  it("should detect same items by attachmentId", () => {
    const list = new QuestionAttachmentList();
    const attachmentId = new UniqueEntityId("attachment-1");
    const questionId = new UniqueEntityId("question-1");

    const qa1 = QuestionAttachment.create({
      attachmentId,
      questionId,
    });
    const qa2 = QuestionAttachment.create({
      attachmentId,
      questionId,
    });

    list.add(qa1);
    list.add(qa2);

    expect(list.getItems()).toHaveLength(1);
  });
});
