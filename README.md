<div align="center">
  <img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=FFCA28&height=180&section=header&text=Forum%20DDD&fontSize=42&fontColor=fff&animation=fadeIn&fontAlignY=35&desc=Clean%20Architecture%20%20and%20%20Domain-Driven%20Design&descSize=18&descAlignY=52"/>
</div>

# Forum Domain Layer — DDD & Clean Architecture Reference Implementation

[<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.0-3178C6.svg"/>](https://www.typescriptlang.org/)
[<img alt="Vitest" src="https://img.shields.io/badge/Vitest-2.1-6E9F18.svg"/>](https://vitest.dev/)
[<img alt="DDD" src="https://img.shields.io/badge/Pattern-Domain_Driven_Design-orange.svg"/>](https://en.wikipedia.org/wiki/Domain-driven_design)
[<img alt="Clean Architecture" src="https://img.shields.io/badge/Pattern-Clean_Architecture-blue.svg"/>](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
[<img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg"/>](https://opensource.org/licenses/MIT)

> Pure domain layer implementing a discussion forum with Domain-Driven Design, Clean Architecture, and functional error handling patterns.

This project is a **domain-only reference implementation** — no frameworks, no database, no HTTP server. It contains the core business logic for a forum application, demonstrating how to structure a domain layer that is completely independent of infrastructure concerns.

## What This Project Is

A **self-contained domain layer** that can be plugged into any infrastructure (REST API, GraphQL, CLI, message queue). Every class, interface, and pattern exists to serve the domain model — not the other way around.

**What you'll find here:**

- Entities, Value Objects, and Aggregate Roots
- Repository interfaces (no implementations — that's infrastructure's job)
- Domain Events with a publish/subscribe dispatch system
- Use Cases with functional error handling via the Either monad
- WatchedList for tracking collection changes
- Unit tests co-located with their use cases

**What you won't find here:**

- No web framework (Express, Fastify, etc.)
- No ORM or database (Prisma, TypeORM, PostgreSQL, etc.)
- No Docker, no CI/CD pipeline
- No HTTP routes, no controllers, no middleware

That's the point. This is the innermost circle of Clean Architecture — pure domain logic with zero infrastructure dependencies.

## Architecture

```
┌─────────────────────────────────────────┐
│              Infrastructure              │  ← Not in this project
│        (HTTP, Database, External)        │
├─────────────────────────────────────────┤
│              Application Layer           │
│     Use Cases · Repository Interfaces    │
├─────────────────────────────────────────┤
│              Enterprise Layer            │
│   Entities · Value Objects · Events      │
├─────────────────────────────────────────┤
│                Core                      │
│  Either · Entity · AggregateRoot ·       │
│  UniqueEntityId · WatchedList ·          │
│  DomainEvents · EventHandler             │
└─────────────────────────────────────────┘
```

**Dependency rule:** Outer layers depend on inner layers. Inner layers never depend on outer layers. The enterprise layer has no knowledge of how data is persisted or delivered.

## Project Structure

```
src/
├── core/                                  # Shared kernel
│   ├── entities/
│   │   ├── aggregate-root.ts              # Base aggregate with domain events
│   │   ├── entity.ts                      # Base entity with identity equality
│   │   ├── unique-entity-id.ts            # UUID-based identity value object
│   │   ├── watched-list.ts                # Observable collection tracker
│   │   └── types/
│   │       └── optional.ts                # Utility type for partial props
│   ├── errors/
│   │   └── use-case-error.ts              # Use case error contract
│   ├── events/
│   │   ├── domain-event.ts                # Domain event interface
│   │   ├── domain-events.ts               # Static event dispatcher (pub/sub)
│   │   └── event-handler.ts               # Handler interface
│   ├── either.ts                          # Either monad (Left/Right)
│   └── repositories/
│       └── pagination-params.ts           # Pagination value object
│
└── domain/
    ├── forum/
    │   ├── enterprise/
    │   │   ├── entities/
    │   │   │   ├── question.ts            # Aggregate root
    │   │   │   ├── answer.ts              # Aggregate root
    │   │   │   ├── question-comment.ts
    │   │   │   ├── answer-comment.ts
    │   │   │   ├── attachment.ts
    │   │   │   ├── question-attachment.ts
    │   │   │   ├── answer-attachment.ts
    │   │   │   ├── question-attachment-list.ts  # WatchedList subclass
    │   │   │   ├── answer-attachment-list.ts    # WatchedList subclass
    │   │   │   ├── student.ts
    │   │   │   ├── instructor.ts
    │   │   │   ├── comments.ts            # Base comment entity
    │   │   │   └── value-objects/
    │   │   │       └── slug.ts            # Slug value object
    │   │   └── events/
    │   │       ├── answer-created-events.ts
    │   │       └── question-best-answer-chosen-event.ts
    │   └── application/
    │       ├── repositories/              # Interfaces only — no implementations
    │       │   ├── questions-repository.ts
    │       │   ├── answers-repository.ts
    │       │   ├── question-comment-repository.ts
    │       │   ├── answer-comment-repository.ts
    │       │   ├── question-attachments-repository.ts
    │       │   └── answer-attachments-repository.ts
    │       ├── use-cases/
    │       │   ├── create-question.ts
    │       │   ├── edit-question.ts
    │       │   ├── delete-question.ts
    │       │   ├── get-question-by-slug.ts
    │       │   ├── fetch-recent-questions.ts
    │       │   ├── answer-question.ts
    │       │   ├── edit-answer.ts
    │       │   ├── delete-answer.ts
    │       │   ├── fetch-question-answer.ts
    │       │   ├── choose-question-best-answer.ts
    │       │   ├── comment-on-question.ts
    │       │   ├── comment-on-answer.ts
    │       │   ├── delete-question-coment.ts
    │       │   ├── delete-answer-comment.ts
    │       │   ├── fetch-question-comments.ts
    │       │   ├── fetch-answers-comment.ts
    │       │   ├── errors/
    │       │   │   ├── resource-not-found-error.ts
    │       │   │   └── not-allowed-error.ts
    │       │   └── *.spec.ts               # Tests co-located with use cases
    │       └── (33 use case files total)
    │
    └── notification/
        ├── enterprise/
        │   └── notification.ts
        └── application/
            ├── repositories/
            │   └── notification-repository.ts
            ├── use-cases/
            │   ├── send-notification.ts
            │   └── read-notifications.ts
            └── subscribers/               # Domain event subscribers
                ├── on-answer-created.ts
                └── on-question-best-answer-chosen.ts
```

## Key Patterns

### Either Monad — Functional Error Handling

Use cases return `Either<Error, Success>` instead of throwing exceptions. This makes error handling explicit and type-safe at compile time:

```typescript
// Use case signature — errors are part of the type system
type CreateQuestionResponse = Either<
  null,
  { question: Question }
>

// Caller must handle both paths
const result = await createQuestion.execute({ ... })

if (result.isRight()) {
  // TypeScript knows result.value is { question: Question }
  console.log(result.value.question.title)
}

if (result.isLeft()) {
  // TypeScript knows result.value is the error type
  return result.value
}
```

### Aggregate Root with Domain Events

Aggregates extend `AggregateRoot` and emit domain events when business rules are triggered:

```typescript
export class Question extends AggregateRoot<QuestionProps> {
  set bestAnswerId(bestAnswerId: UniqueEntityId | undefined) {
    if (bestAnswerId && !this.props.bestAnswerId?.equals(bestAnswerId)) {
      this.addDomainEvent(new QuestionBestAnswerChosenEvent(this, bestAnswerId))
    }
    this.props.bestAnswerId = bestAnswerId
  }
}
```

Events are dispatched through the static `DomainEvents` mediator — subscribers register callbacks by event class name:

```typescript
DomainEvents.register(callback, 'QuestionBestAnswerChosenEvent')
```

### Repository Pattern — Interfaces Only

Repositories are defined as interfaces in the application layer. Infrastructure provides concrete implementations:

```typescript
export interface QuestionsRepository {
  findById(id: string): Promise<Question | null>
  findManyRecent(params: PaginationParams): Promise<Question[]>
  findBySlug(slug: string): Promise<Question | null>
  delete(question: Question): Promise<void>
  save(question: Question): Promise<void>
  create(question: Question): Promise<void>
}
```

Use cases receive repositories via constructor injection, making them testable with in-memory fakes.

### WatchedList — Change-Tracking Collections

`WatchedList<T>` tracks which items were added, removed, or existed initially. Used for attachment management:

```typescript
export class QuestionAttachmentList extends WatchedList<QuestionAttachment> {
  compareItems(a: QuestionAttachment, b: QuestionAttachment): boolean {
    return a.equals(b)
  }
}
```

### Entity Identity

All entities carry a `UniqueEntityId` (UUID). Equality is based on identity, not property comparison:

```typescript
export abstract class Entity<Props> {
  private _id: UniqueEntityId

  public equals(entity: Entity<any>) {
    return entity === this || entity.id === this._id
  }
}
```

## Bounded Contexts

The domain is split into two bounded contexts:

| Context | Purpose | Entities |
|---------|---------|----------|
| **Forum** | Q&A discussion | Question, Answer, Comment, Attachment, Student, Instructor |
| **Notification** | User notifications | Notification |

Cross-context communication happens through domain events — the `notification` context subscribes to events from the `forum` context (`OnAnswerCreated`, `OnQuestionBestAnswerChosen`).

## Testing

Tests are written with [Vitest](https://vitest.dev/) and co-located with their use cases as `.spec.ts` files.

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Lint
npm run lint
```

Tests use in-memory repository fakes — no database required. Example from `create-question.spec.ts`:

```typescript
// Fake repository implements the interface in-memory
class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []
  // ... interface methods operating on this.items
}
```

## Use Cases

The forum context includes 16 use cases covering the full Q&A lifecycle:

**Questions:** Create, Edit, Delete, Get by Slug, Fetch Recent

**Answers:** Answer Question, Edit Answer, Delete Answer, Fetch Question Answers, Choose Best Answer

**Comments:** Comment on Question, Comment on Answer, Delete Question Comment, Delete Answer Comment, Fetch Question Comments, Fetch Answer Comments

## Dependencies

| Package | Purpose |
|---------|---------|
| [dayjs](https://dayjs.dev/) | Date manipulation in entity business rules |
| [vitest](https://vitest.dev/) | Test runner |
| [@faker-js/faker](https://fakerjs.dev/) | Test data generation |
| [typescript](https://www.typescriptlang.org/) | Type system |
| [eslint](https://eslint.org/) | Code linting |

One runtime dependency (`dayjs`). Everything else is dev tooling.

## License

MIT

<div align="center">
  <img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=FFCA28&height=100&section=footer"/>
  <br/><sub>Built with ❤️ by <a href="https://github.com/rafaumeu">Rafael Zendron</a></sub>
</div>

<p align="center">
  <a href="https://github.com/rafaumeu/forum/generate"><img src="https://img.shields.io/badge/Use_This_Template-FFCA28?style=for-the-badge&logo=github&logoColor=white" alt="Use this template"/></a>
</p>
