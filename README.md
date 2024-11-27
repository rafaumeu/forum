# Forum 💬

A sophisticated discussion platform built with Domain-Driven Design (DDD) and Clean Architecture principles.

[![Build Status](https://img.shields.io/github/actions/workflow/status/rafaumeu/forum/ci.yml?branch=main&style=for-the-badge&logo=github)](https://github.com/rafaumeu/forum/actions)
[![Version](https://img.shields.io/badge/version-1.0.0-blueviolet?style=for-the-badge)](https://github.com/rafaumeu/forum/releases)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Coverage](https://img.shields.io/codecov/c/github/rafaumeu/forum?style=for-the-badge&logo=codecov)](https://codecov.io/gh/rafaumeu/forum)
[![Last Commit](https://img.shields.io/github/last-commit/rafaumeu/forum?style=for-the-badge&logo=git)](https://github.com/rafaumeu/forum/commits/main)
[![Contributors](https://img.shields.io/github/contributors/rafaumeu/forum?style=for-the-badge)](https://github.com/rafaumeu/forum/graphs/contributors)

## 🌟 Project Overview

Forum is an innovative discussion platform designed with a focus on robust architecture, scalability, and clean code principles. Built using Domain-Driven Design (DDD) and Clean Architecture, the project aims to provide a flexible and maintainable solution for creating discussion spaces.

### ✨ Key Features

- Comprehensive Question and Answer domain
- Advanced commenting system
- Flexible user entities (Student and Instructor)
- Structured error handling
- Clean, modular architecture

## 🛠 Tech Stack

![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Vitest](https://img.shields.io/badge/-Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white)
![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/-Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black)

## 🌟 Project Overview

Forum is an innovative discussion platform designed with a focus on robust architecture, scalability, and clean code principles. Built using Domain-Driven Design (DDD) and Clean Architecture, the project aims to provide a flexible and maintainable solution for creating discussion spaces.

### ✨ Key Features

- Comprehensive Question and Answer domain
- Advanced commenting system
- Flexible user entities (Student and Instructor)
- Structured error handling
- Clean, modular architecture

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (v9+)

### Installation

```bash
# Clone the repository
git clone https://github.com/rafaumeu/forum

# Navigate to project directory
cd forum

# Install dependencies
npm install

# Run tests to verify installation
npm run test
```

## 📂 Project Structure

```
src/
├── domain/
│   ├── entities/
│   │   ├── question.ts
│   │   ├── answer.ts
│   │   ├── student.ts
│   │   └── instructor.ts
│   └── repositories/
│       └── ...
├── application/
│   └── use-cases/
│       └── ...
└── infra/
    └── [under development]
```

## 🧪 Running Tests

```bash
# Run all tests
npm run test

# Watch mode for development
npm run test:watch
```

## 🗺️ Roadmap

### Phase 1 - Core Domain (Completed)

- [x] Main entities implementation
- [x] Base repositories development
- [x] Initial use cases implementation
- [x] Unit testing

### Phase 2 - Infrastructure (In Progress)

- [ ] PostgreSQL configuration
- [ ] Prisma repositories
- [ ] Express routes development
- [ ] Docker setup

### Phase 3 - Advanced Features

- [ ] Authentication system
- [ ] Complete CRUD operations
- [ ] Advanced commenting system
- [ ] Content voting mechanism

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow DDD principles
- Maintain high test coverage
- Adhere to coding standards
- Document your changes

## 📝 Design Principles

- **Domain-Driven Design**: Focusing on core business logic
- **Clean Architecture**: Ensuring separation of concerns
- **Type Safety**: Leveraging TypeScript for robust development

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="center">
Made with ❤️ by Rafael
</p>
