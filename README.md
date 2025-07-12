# Ergo-Type: Split Keyboard Web Store

A fullstack TypeScript monorepo for learning modern web development by building a split keyboard web store with preview functionality.

## 🎯 Project Overview

This project is designed to teach fullstack software engineering concepts through hands-on development of a split keyboard web store. The focus is on building a robust backend API with TypeScript, Express, and PostgreSQL, with plans for a React frontend.

## 🏗️ Architecture

This is a **monorepo** using npm workspaces with the following structure:

```
ergo-type/
├── apps/
│   ├── backend/                 # Express.js API server (Active)
│   │   ├── src/
│   │   │   ├── config/          # Database and app configuration
│   │   │   ├── middleware/      # Custom Express middleware
│   │   │   ├── models/          # Sequelize database models
│   │   │   ├── routes/          # API route definitions
│   │   │   ├── scripts/         # Database management scripts
│   │   │   └── test/            # Backend tests
│   │   ├── package.json         # Backend-specific dependencies
│   │   └── tsconfig.json        # TypeScript configuration
│   └── frontend/                # React frontend (Planned)
├── package.json                 # Root workspace configuration
├── eslint.config.mjs            # Global ESLint configuration
├── .prettierrc                  # Global Prettier configuration
└── README.md
```

## 🛠️ Tech Stack

### Backend (Active)
- **Runtime**: Node.js 18+
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Sequelize ORM
- **Validation**: Zod for request validation
- **Testing**: Jest + Supertest
- **Security**: Helmet, CORS, Morgan logging

### Development Tools
- **Package Manager**: npm with workspace support
- **Code Quality**: ESLint + Prettier with pre-commit hooks
- **Git Hooks**: Husky + lint-staged
- **Type Checking**: TypeScript strict mode

### Planned Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context + Zustand

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- npm

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd ergo-type

# Install all dependencies (root + workspaces)
npm install

# Set up environment variables
cp apps/backend/.env.example apps/backend/.env
# Edit apps/backend/.env with your database credentials

# Start the backend development server
cd apps/backend
npm run dev
```

### Available Commands

#### From Root Directory
```bash
npm run lint          # Lint all files in the project
npm run format        # Format all files with Prettier
npm run lint:fix      # Auto-fix linting issues
```

## 🔧 Development Workflow

### Code Quality
This project uses pre-commit hooks to ensure code quality:

1. **Prettier**: Automatically formats code
2. **ESLint**: Checks for code quality issues
3. **TypeScript**: Type checking

The hooks run automatically on staged files when you commit. If there are unfixable linting errors, the commit will be blocked until you fix them.

### Adding New Features
1. Create a feature branch from `main`
2. Make your changes
3. Add tests for new functionality
4. Run `npm run test` and `npm run lint`
5. Commit your changes (hooks will run automatically)
6. Create a pull request

## 📋 Development Roadmap

### ✅ Completed
- [x] Monorepo setup with npm workspaces
- [x] Backend Express server with TypeScript
- [x] PostgreSQL integration with Sequelize
- [x] Keyboard CRUD API endpoints
- [x] Input validation with Zod
- [x] Error handling middleware
- [x] Basic testing setup
- [x] Code quality tools (ESLint, Prettier, Husky)
- [x] Database management scripts

### 🚧 In Progress
- [ ] Comprehensive test coverage
- [ ] API documentation
- [ ] User authentication system

### 📅 Planned
- [ ] React frontend application
- [ ] User management and authentication
- [ ] Shopping cart functionality
- [ ] Admin dashboard
- [ ] Image upload for keyboards
- [ ] Search and filtering
- [ ] E2E testing

## 🤝 Contributing

This is a learning project, but contributions are welcome! Please follow the established coding standards:

1. Follow TypeScript best practices
2. Write tests for new features
3. Use meaningful commit messages
4. Follow the existing code style (enforced by Prettier/ESLint)

## 📚 Learning Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Sequelize Documentation](https://sequelize.org/docs/v6/)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)
- [Zod Validation](https://zod.dev/)

## 📝 License

This project is for educational purposes.

---

For detailed backend documentation, see [apps/backend/README.md](./apps/backend/README.md).
