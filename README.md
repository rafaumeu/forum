# 💬 Forum: Advanced Discussion Platform

[![Node.js Version](https://img.shields.io/badge/Node.js-18+-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/rafaumeu/forum)
[![Coverage](https://img.shields.io/badge/coverage-85%25-brightgreen)](https://github.com/rafaumeu/forum)
[![DDD](https://img.shields.io/badge/Architecture-DDD-orange)](https://en.wikipedia.org/wiki/Domain-driven_design)
[![Prisma](https://img.shields.io/badge/ORM-Prisma-blue)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)](https://www.postgresql.org/)

[Resto do README anterior permanece igual]

## 🚀 Project Overview

Forum is a cutting-edge discussion platform meticulously crafted using Domain-Driven Design (DDD) and Clean Architecture principles. Designed for exceptional scalability, maintainability, and robust performance, this platform introduces advanced error handling, domain event management, and efficient data structures.

## ✨ Key Features

### 🏗️ Architectural Excellence

- **Clean Architecture**: Modular design with crystal-clear separation of concerns
- **Domain-Driven Design (DDD)**: Laser-focused on core business logic and domain expertise
- **Functional Error Handling**: Providing a resilient and user-friendly experience

### 💬 Core Functionalities

- **Comprehensive Q&A System**: Intuitive question and answer management
- **Advanced Commenting**: Robust and flexible commenting infrastructure
- **Flexible User Roles**: Distinct entities for Students and Instructors

### 🧪 Quality Assurance

- **Rigorous Testing**: High test coverage ensuring code reliability
- **Domain Event Management**: Efficient communication between system components
- **Watched Lists**: Dynamic data management with observable collections

## 🛠 Tech Stack

### Languages & Frameworks

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

### Database

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

### Testing & Quality

![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

### DevOps & Tools

![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

### Development Principles

![Domain Driven Design](https://img.shields.io/badge/Architecture-Domain--Driven%20Design-orange?style=for-the-badge)
![Clean Architecture](https://img.shields.io/badge/Architecture-Clean%20Architecture-blue?style=for-the-badge)

## 📦 Project Structure

```
forum/
│
├── src/
│   ├── domain/               # Core business logic
│   │   ├── entities/         # Domain models
│   │   └── repositories/     # Data access interfaces
│   │
│   ├── application/          # Use cases and application logic
│   │   └── use-cases/        # Business workflows
│   │
│   └── infra/                # Infrastructure implementations
│       ├── database/         # Database configurations
│       └── http/             # API route handlers
│
└── tests/                    # Comprehensive test suites
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
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🗺️ Development Roadmap

### Phase 1: Core Domain ✅

- [x] Implementation of core entities
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

Contributions transform open-source communities into incredible learning and innovation platforms!

### How to Contribute

1. **Fork the Project**
2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Commit Changes**

   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. **Push to Branch**

   ```bash
   git push origin feature/AmazingFeature
   ```

5. **Open a Pull Request**

### Contribution Guidelines

- Adhere to Domain-Driven Design principles
- Maintain high test coverage (>80%)
- Follow project coding standards
- Document all significant changes

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Crafted with ❤️ by Rafael<br>
  <a href="https://github.com/rafaumeu">@rafaumeu</a>
</p>
