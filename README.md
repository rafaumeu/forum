# 💬 Forum: Advanced Discussion Platform

## 🚀 Project Overview

Forum is a cutting-edge discussion platform meticulously crafted using Domain-Driven Design (DDD) and Clean Architecture principles. Designed for scalability, maintainability, and robust performance.

[![Build Status](https://img.shields.io/github/actions/workflow/status/rafaumeu/forum/ci.yml?branch=main&style=for-the-badge&logo=github)](https://github.com/rafaumeu/forum/actions)
[![Version](https://img.shields.io/badge/version-1.0.0-blueviolet?style=for-the-badge)](https://github.com/rafaumeu/forum/releases)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.4-3178C6?style=for-the-badge)](https://www.typescriptlang.org/)

## ✨ Key Features

- 🔍 **Comprehensive Q&A System**: Intuitive question and answer management
- 💬 **Advanced Commenting**: Robust commenting functionality
- 👥 **Flexible User Roles**: Distinct entities for Students and Instructors
- 🏗️ **Clean Architecture**: Modular design with clear separation of concerns
- 🛡️ **Domain-Driven Design**: Focus on core business logic and domain expertise
- 🧪 **Rigorous Testing**: High test coverage and reliable code quality

## 🛠 Tech Stack

![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Vitest](https://img.shields.io/badge/-Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white)
![Prisma](https://img.shields.io/badge/-Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white)

## 📦 Project Structure

```
forum/
│
├── src/
│   ├── domain/           # Core business logic
│   │   ├── entities/     # Domain models
│   │   └── repositories/ # Data access interfaces
│   │
│   ├── application/      # Use cases and application logic
│   │   └── use-cases/    # Business workflows
│   │
│   └── infra/            # Infrastructure implementations
│       ├── database/     # Database configurations
│       └── http/         # API route handlers
│
└── tests/                # Comprehensive test suites
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+
- PostgreSQL

### Installation

```bash
# Clone the repository
git clone https://github.com/rafaumeu/forum

# Navigate to project directory
cd forum

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run database migrations
npm run db:migrate

# Start the development server
npm run dev
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Watch mode for development
npm test:watch

# Generate coverage report
npm run test:coverage
```

## 🗺️ Roadmap

### Phase 1: Core Domain ✅

- [x] Core entities implementation
- [x] Base repository design
- [x] Initial use case development
- [x] Comprehensive unit testing

### Phase 2: Infrastructure 🚧

- [ ] PostgreSQL integration
- [ ] Prisma ORM configuration
- [ ] Express.js route implementation
- [ ] Docker containerization

### Phase 3: Advanced Features 📍

- [ ] Authentication system
- [ ] Complete CRUD operations
- [ ] Enhanced commenting mechanisms
- [ ] Content voting and reputation system

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow Domain-Driven Design principles
- Maintain high test coverage (>80%)
- Adhere to project coding standards
- Document all significant changes

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
   Crafted with ❤️ by Rafael
   <br>
   <a href="https://github.com/rafaumeu">@rafaumeu</a>
</p>
