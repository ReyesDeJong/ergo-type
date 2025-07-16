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
│   └── frontend/                # React frontend (Active)
│       ├── src/
│       │   ├── components/      # Reusable UI components
│       │   ├── pages/           # Page components
│       │   ├── services/        # API services
│       │   ├── types/           # TypeScript type definitions
│       │   └── test/            # Frontend tests
│       ├── package.json         # Frontend-specific dependencies
│       └── vite.config.ts       # Vite configuration
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

### Frontend (Active)
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Testing**: Vitest + React Testing Library
- **Styling**: CSS with responsive design
- **Code Quality**: ESLint + Prettier

### Development Tools
- **Package Manager**: npm with workspace support
- **Code Quality**: ESLint + Prettier with pre-commit hooks
- **Git Hooks**: Husky + lint-staged
- **Type Checking**: TypeScript strict mode

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ (recommended for full workspace support)
- PostgreSQL 15+
- npm

### Frontend Features
- **Modern React 19**: Latest React features with TypeScript
- **Fast Development**: Vite for instant hot module replacement
- **Client-side Routing**: React Router for seamless navigation
- **Responsive Design**: Mobile-first approach with CSS Grid
- **Component Testing**: Comprehensive testing with Vitest and React Testing Library
- **Keyboard Preview**: Interactive keyboard visualization
- **Type Safety**: Full TypeScript integration for better development experience

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

# In a new terminal, start the frontend development server
cd apps/frontend
npm run dev
```

### Available Commands

#### From Root Directory
```bash
# Code Quality
npm run lint                    # Lint all files in the project
npm run lint:fix               # Auto-fix linting issues
npm run format                 # Format all files with Prettier
npm run format:check           # Check formatting without changes

# Type Checking
npm run type-check             # Type check both backend and frontend
npm run type-check:backend     # Type check backend only
npm run type-check:frontend    # Type check frontend only

# Testing
npm run test --workspace=@ergo-type/backend    # Run backend tests
npm run test --workspace=@ergo-type/frontend   # Run frontend tests

# Development
npm run dev --workspace=@ergo-type/backend     # Start backend dev server
npm run dev --workspace=@ergo-type/frontend    # Start frontend dev server
```

## 🔧 Development Workflow

### Code Quality & Pre-commit Hooks
This project uses pre-commit hooks to ensure code quality:

1. **Prettier**: Automatically formats code
2. **ESLint**: Checks for code quality issues
3. **TypeScript**: Type checking for both backend and frontend

The hooks run automatically on staged files when you commit. If there are unfixable linting errors, the commit will be blocked until you fix them.

### Continuous Integration (CI/CD)
The project includes a comprehensive GitHub Actions workflow that runs on every push and pull request:

#### CI Pipeline Steps:
1. **Setup**: Node.js 20 + npm caching
2. **Install**: `npm ci` (installs all workspace dependencies)
3. **Lint**: Backend and frontend linting
4. **Format**: Code formatting check
5. **Type Check**: TypeScript compilation for both apps
6. **Test**: Jest (backend) + Vitest (frontend) with PostgreSQL service
7. **Build**: Frontend build verification
8. **Coverage**: Upload test coverage reports

#### What Gets Checked:
- ✅ **Code Quality**: ESLint + Prettier formatting
- ✅ **Type Safety**: TypeScript compilation for both apps
- ✅ **Testing**: Unit and integration tests
- ✅ **Build Process**: Frontend production build
- ✅ **Database**: PostgreSQL integration tests

### npm Workspaces
This project uses npm workspaces for efficient dependency management:

- **Root workspace**: Contains shared dev dependencies (ESLint, Prettier, Husky)
- **Backend workspace** (`@ergo-type/backend`): Express.js API with PostgreSQL
- **Frontend workspace** (`@ergo-type/frontend`): React app with Vite

#### Workspace Benefits:
- **Deduplication**: Shared dependencies installed once at root
- **Isolation**: Each app has its own specific dependencies
- **Consistency**: Same Node.js version and environment across apps
- **Efficiency**: Faster installs and builds

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
- [x] React frontend with TypeScript
- [x] Vite build system and development server
- [x] React Router for client-side routing
- [x] Component testing with Vitest and React Testing Library
- [x] Responsive design with CSS
- [x] Keyboard preview functionality
- [x] **TypeScript type checking** for both backend and frontend
- [x] **Pre-commit hooks** with linting, formatting, and type checking
- [x] **GitHub Actions CI/CD** pipeline with comprehensive testing
- [x] **npm workspace commands** for efficient development
- [x] **Test coverage reporting** for both apps
- [x] **Build verification** for frontend production builds

### 🚧 In Progress
- [ ] Comprehensive test coverage
- [ ] API documentation
- [ ] User authentication system

### 📅 Planned
- [ ] User management and authentication
- [ ] Shopping cart functionality
- [ ] Admin dashboard
- [ ] Image upload for keyboards
- [ ] Search and filtering
- [ ] E2E testing
- [ ] Advanced keyboard customization features
- [ ] User reviews and ratings

## 🤝 Contributing

This is a learning project, but contributions are welcome! Please follow the established coding standards:

1. Follow TypeScript best practices
2. Write tests for new features
3. Use meaningful commit messages
4. Follow the existing code style (enforced by Prettier/ESLint)

## 📚 Learning Resources

### Backend
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Sequelize Documentation](https://sequelize.org/docs/v6/)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)
- [Zod Validation](https://zod.dev/)

### Frontend
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router Documentation](https://reactrouter.com/)
- [Vitest Testing Framework](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## 📝 License

This project is for educational purposes.

---

For detailed documentation:
- Backend: [apps/backend/README.md](./apps/backend/README.md)
- Frontend: [apps/frontend/README.md](./apps/frontend/README.md)
