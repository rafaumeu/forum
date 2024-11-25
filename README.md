# Forum: A DDD-Based Discussion Platform

[![Status](https://img.shields.io/badge/status-in%20development-orange)](#)
[![Version](https://img.shields.io/badge/version-0.1.0-blue)](#)

A discussion platform in early development, built with Domain-Driven Design (DDD) principles and Clean Architecture.

## Overview

Forum is in its initial development stages, focusing on implementing a robust architecture following DDD principles. The project aims to create a scalable and well-structured discussion platform.

### Current Project Status

✅ **Implemented**:

- Core Question and Answer domain
- Initial repositories
- Fundamental use cases
- Project structure following Clean Architecture

🚧 **Under Development**:

- Infrastructure implementation
- Database setup
- API routes development
- Presentation layer implementation

## Architecture

The project follows a clean architecture with the following layers:

```
src/
├── domain/
│   ├── entities/
│   │   ├── question.ts
│   │   └── answer.ts
│   └── repositories/
│       ├── questions-repository.ts
│       └── answers-repository.ts
├── application/
│   └── use-cases/
│       ├── create-question.ts
│       └── create-answer.ts
└── infra/
    └── [under development]
```

## Tech Stack

### Core

- **Language**: TypeScript
- **Runtime**: Node.js

### Quality Assurance

- **Testing**: Vitest
- **Linting**: ESLint + Prettier

## Roadmap

### Phase 1 - Core Domain (Current)

- [x] Core entities implementation
- [x] Base repositories development
- [x] Initial use cases implementation
- [ ] Use cases unit testing

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

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Development Setup

```bash
# Clone the repository
git clone https://github.com/rafaumeu/forum
cd forum

# Install dependencies
npm install

# Run tests
npm run test

# [Additional commands will be added as development progresses]
```

## Planned API Structure

```
# Planned Endpoints

POST /questions     - Create new question
GET  /questions/:id - Get specific question
POST /answers       - Create new answer
GET  /answers/:id   - Get specific answer
```

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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
<p align="center">
Built with ❤️ by <a href="https://github.com/rafaumeu">rafaumeu</a>
</p>
