# 💬 Forum: Advanced Discussion Platform

![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![License](https://img.shields.io/badge/License-MIT-yellow)
![DDD](https://img.shields.io/badge/Architecture-DDD-orange)

## 🚀 Project Overview

Forum is an advanced discussion platform built with cutting-edge software engineering principles, focusing on:

- Domain-Driven Design (DDD)
- Clean Architecture
- Scalable and Maintainable Codebase

## ✨ Key Features

### 🏗️ Architectural Excellence

- **Clean Architecture**: Modular design with clear separation of concerns
- **Domain-Driven Design**: Focused on core business logic
- **Functional Error Handling**: Resilient and user-friendly experience

### 💬 Core Functionalities

- Comprehensive Q&A System
- Advanced Commenting Infrastructure
- Flexible User Role Management (Students and Instructors)

### 🧪 Quality Assurance

- Rigorous Testing
- Domain Event Management
- Observable Collections and Dynamic Data Management

## 🛠 Tech Stack

### Languages & Frameworks

- TypeScript
- Node.js
- Express.js

### Database

- PostgreSQL
- Prisma ORM

### Testing & Quality

- Vitest
- ESLint

### DevOps & Tools

- Docker
- Git
- GitHub

## 📦 Project Structure

```
forum/
├── src/
│   ├── domain/           # Core business logic
│   │   ├── entities/     # Domain models
│   │   └── repositories/ # Data access interfaces
│   ├── application/      # Use cases and application logic
│   └── infra/            # Infrastructure implementations
│       ├── database/     # Database configurations
│       └── http/         # API route handlers
└── tests/                # Comprehensive test suites
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+
- PostgreSQL
- Docker (optional)

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
```

## 🔐 Environment Configuration

### Generating Environment Variables

#### Database Connection

Update `DATABASE_URL` with your PostgreSQL credentials:

```env
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/database=public"
```

#### JWT Secret Keys Generation

Generate secure keys using OpenSSL:

```bash
# Generate Private Key
openssl rand -base64 32 | openssl dgst -sha256 -binary | base64

# Generate Public Key
openssl rand -base64 32 | openssl dgst -sha256 -binary | base64
```

### `.env.example` Template

```env
# Database connection string
DATABASE_URL="postgresql://user:password@localhost:5432/database=public"

# JWT Secret Keys
# Use OpenSSL commands above to generate these keys
JWT_SECRET_PRIVATE_KEY="YOUR_PRIVATE_KEY_HERE"
JWT_SECRET_PUBLIC_KEY="YOUR_PUBLIC_KEY_HERE"
```

## 🗃️ Database Setup

### Using Docker Compose

```bash
# Start PostgreSQL database
docker-compose up -d
```

### Prisma Database Management

```bash
# Initialize Prisma and generate database schema
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Open Prisma Studio (Database Visualization Tool)
npx prisma studio
```

#### Prisma Studio

- Web-based database management interface
- Allows direct data viewing and editing
- Accessible at `http://localhost:5555`

## 🚀 Running the Application

```bash
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

- [x] PostgreSQL integration
- [x] Prisma ORM configuration
- [x] Express.js route implementation
- [ ] Docker containerization

### Phase 3: Advanced Features 📍

- [ ] Authentication system
- [ ] Complete CRUD operations
- [ ] Enhanced commenting mechanisms
- [ ] Content voting and reputation system

## 🤝 Contributing

Contributions are welcome! Help us improve this open-source project.

### How to Contribute

1. Fork the Project
2. Create a Feature Branch

   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. Commit Changes

   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. Push to Branch

   ```bash
   git push origin feature/AmazingFeature
   ```

5. Open a Pull Request

### Contribution Guidelines

- Adhere to Domain-Driven Design principles
- Maintain high test coverage (>80%)
- Follow project coding standards
- Document significant changes

## 🔒 Security Recommendations

- Never commit `.env` file to version control
- Use strong, unique secrets
- Rotate keys periodically
- Limit environment variable access

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Crafted with ❤️ by Rafael<br>
  <a href="https://github.com/rafaumeu">@rafaumeu</a>
</p>
