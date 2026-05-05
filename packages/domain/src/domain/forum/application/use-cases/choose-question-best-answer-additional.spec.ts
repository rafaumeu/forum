import { ChooseQuestionBestAnswerUseCase } from "@/domain/forum/application/use-cases/choose-question-best-answer";
import { ResourceNotFoundError } from "@/domain/forum/application/use-cases/errors/resource-not-found-error";
import { makeAnswer } from "@/test/factories/make-answer";
import { InMemoryAnswerAttachmentsRepository } from "@/test/repositories/in-memory-answer-attachment.repository";
import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answer-repository";
import { InMemoryQuestionAttachmentsRepository } from "@/test/repositories/in-memory-question-attachments-repository";
import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe("Choose question best answer additional", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    );
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    );
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    );
  });

  it("should not be able to choose best answer when question is not found", async () => {
    const answer = makeAnswer();

    await inMemoryAnswersRepository.create(answer);

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
