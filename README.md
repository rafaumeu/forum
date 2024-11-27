# Forum: A DDD-Based Discussion Platform

[![Status](https://img.shields.io/badge/status-in%20development-orange)](#)
[![Version](https://img.shields.io/badge/version-0.1.0-blue)](#)

A discussion platform in early development, built with Domain-Driven Design (DDD) principles and Clean Architecture.

## Overview

Forum is in its initial development stages, focusing on implementing a robust architecture following DDD principles. The project aims to create a scalable and well-structured discussion platform.

### Current Project Status

#### ✅ Implemented

- Core Question and Answer domain
- Initial repositories
- Fundamental use cases
- Project structure following Clean Architecture
- Commenting functionality for questions and answers
- Fetching recent questions and answers
- Editing and deleting questions and answers
- Choosing the best answer for a question
- Unit tests for core functionalities

#### 🚧 Under Development

- Infrastructure implementation
- Database setup
- API routes development
- Presentation layer implementation

## Architecture Structure

```
src/
├── domain/
│   ├── entities/
│   │   ├── question.ts
│   │   ├── answer.ts
│   │   ├── question-comment.ts
│   │   └── answer-comment.ts
│   └── repositories/
│       ├── questions-repository.ts
│       ├── answers-repository.ts
│       ├── question-comment-repository.ts
│       └── answer-comment-repository.ts
├── application/
│   └── use-cases/
│       ├── create-question.ts
│       ├── edit-question.ts
│       ├── delete-question.ts
│       ├── comment-on-question.ts
│       ├── fetch-question-comments.ts
│       ├── answer-question.ts
│       ├── edit-answer.ts
│       ├── delete-answer.ts
│       ├── choose-question-best-answer.ts
│       ├── fetch-recent-questions.ts
│       └── fetch-answers-comment.ts
└── infra/
    └── [under development]
```

## Tech Stack

### Core Technologies

- **Language**: TypeScript
- **Runtime**: Node.js

### Quality Assurance

- **Testing**: Vitest
- **Linting**: ESLint + Prettier

## Development Roadmap

### Phase 1 - Core Domain (Current)

- [x] Main entities implementation
- [x] Base repositories development
- [x] Initial use cases implementation
- [x] Use cases unit testing

### Phase 2 - Infrastructure

- [ ] PostgreSQL configuration
- [ ] Prisma repositories implementation
- [ ] Express routes development
- [ ] Docker setup

### Phase 3 - Features

- [ ] Authentication system
- [ ] Complete questions and answers CRUD
- [ ] Comments system
- [ ] Content voting

## Planned Endpoints

- `POST /questions` - Create new question
- `GET /questions/:id` - Get specific question
- `POST /answers` - Create new answer
- `GET /answers/:id` - Get specific answer
- `POST /questions/:id/comments` - Comment on a question
- `POST /answers/:id/comments` - Comment on an answer

## Running Tests

```bash
# Run unit tests
npm run test

# Watch mode
npm run test:watch
```

## Design Decisions

- **DDD and Clean Architecture**: Ensures separation of concerns and maintainable code
- **TypeScript**: Provides type safety and better developer experience
- **Repository Pattern**: Abstracts data persistence details from domain logic

## Development Setup

```bash
# Clone the repository
git clone https://github.com/rafaumeu/forum
cd forum

# Install dependencies
npm install

# Run tests
npm run test
```

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add NewFeature'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the **LICENSE** file for details.

<p align="center">
Built with ❤️ by <a href="https://github.com/rafaumeu">rafaumeu</a>
</p>
