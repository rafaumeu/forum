import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Notification } from "./notification";

describe("Notification entity", () => {
  it("should return title", () => {
    const notification = Notification.create({
      recipientId: new UniqueEntityId(),
      title: "Test title",
      content: "Test content",
    });

    expect(notification.title).toBe("Test title");
  });

  it("should return content", () => {
    const notification = Notification.create({
      recipientId: new UniqueEntityId(),
      title: "Test title",
      content: "Test content",
    });

    expect(notification.content).toBe("Test content");
  });

  it("should have a createdAt date", () => {
    const notification = Notification.create({
      recipientId: new UniqueEntityId(),
      title: "Test title",
      content: "Test content",
    });

    expect(notification.createdAt).toBeInstanceOf(Date);
  });

  it("should mark notification as read", () => {
    const notification = Notification.create({
      recipientId: new UniqueEntityId(),
      title: "Test title",
      content: "Test content",
    });

    expect(notification.readAt).toBeUndefined();

    notification.read();

    expect(notification.readAt).toBeInstanceOf(Date);
  });
});
