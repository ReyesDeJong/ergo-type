# Ergo-Type: Split Keyboard Web Store

A fullstack TypeScript project for learning modern web development by building a split keyboard web store with preview functionality.

## 🎯 Learning Objectives

This project is designed to teach fullstack software engineering concepts through hands-on development. You'll learn:

### Backend Development
- **Node.js & Express**: Building RESTful APIs
- **TypeScript**: Type-safe server-side development
- **Prisma ORM**: Type-safe database client (using SQLite for local development)
- **Authentication & Authorization**: User management and security
- **API Testing**: Comprehensive backend testing with Jest/Supertest
- **Database Migrations**: Schema management and versioning

### Frontend Development
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe frontend development
- **State Management**: Context API and custom hooks
- **Component Testing**: Unit and integration testing with React Testing Library
- **Responsive Design**: Mobile-first approach with modern CSS
- **Accessibility**: WCAG compliance and keyboard navigation

### DevOps & Best Practices
- **Git Workflow**: Feature branches, PRs, and code reviews
- **Testing Strategy**: Unit, integration, and E2E testing
- **Code Quality**: ESLint, Prettier, and TypeScript strict mode
- **Performance**: Optimization and monitoring
- **Security**: Input validation, SQL injection prevention, XSS protection

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js with TypeScript
- **Database**: SQLite (local dev) / PostgreSQL (production-ready)
- **ORM**: Prisma (type-safe database client)
- **Authentication**: JWT with bcrypt
- **Testing**: Jest + Supertest
- **Validation**: Zod
- **Documentation**: OpenAPI/Swagger

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Headless UI
- **State Management**: React Context + Zustand
- **Testing**: Vitest + React Testing Library
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form + Zod

### Development Tools
- **Package Manager**: npm (workspace support)
- **Code Formatting**: Prettier (configured with pre-commit hooks)
- **Linting**: ESLint (configured with pre-commit hooks)
- **Type Checking**: TypeScript strict mode
- **Git Hooks**: Husky + lint-staged (configured)
- **Database**: Docker for local development

## 📁 Project Structure

```
ergo-type/
├── apps/
│   ├── backend/                 # Express.js API server
│   │   ├── src/
│   │   │   ├── controllers/     # Route handlers
│   │   │   ├── middleware/      # Custom middleware
│   │   │   ├── models/          # Database models
│   │   │   ├── routes/          # API routes
│   │   │   ├── services/        # Business logic
│   │   │   ├── utils/           # Helper functions
│   │   │   └── types/           # TypeScript types
│   │   ├── tests/               # Backend tests
│   │   ├── prisma/              # Database schema & migrations
│   │   └── package.json
│   │
│   └── frontend/                # React application
│       ├── src/
│       │   ├── components/      # Reusable UI components
│       │   ├── pages/           # Page components
│       │   ├── hooks/           # Custom React hooks
│       │   ├── services/        # API client functions
│       │   ├── stores/          # State management
│       │   ├── types/           # TypeScript types
│       │   └── utils/           # Helper functions
│       ├── tests/               # Frontend tests
│       └── package.json
│
├── .gitignore                   # Git ignore rules
├── .prettierrc                  # Prettier configuration
├── .prettierignore              # Prettier ignore rules
├── .husky/                      # Git hooks configuration
│   └── pre-commit              # Pre-commit hook
├── eslint.config.mjs            # ESLint configuration
├── package.json                 # Root package.json with workspace config
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm (comes with Node.js)
- Docker & Docker Compose
- PostgreSQL 15+

### Quick Start
```bash
# Clone the repository
git clone <repository-url>
cd ergo-type

# Install dependencies
npm install

# Format code
npm run format

# Start development environment
npm run dev

# Run tests
npm test

# Run linting
npm run lint
```

### Pre-commit Hooks
This project uses Husky and lint-staged to automatically format and lint code before commits:
- **Prettier**: Formats code for consistent styling
- **ESLint**: Checks for code quality issues and auto-fixes what it can

The hooks run automatically on staged files when you commit. If there are unfixable linting errors, the commit will be blocked until you fix them.

## 📋 Development Roadmap

### Phase 1: Project Setup & Foundation
- [x] Initialize monorepo structure
- [x] Set up TypeScript configurations
- [x] Configure Prettier
- [x] Configure ESLint and Husky
- [ ] Set up PostgreSQL with Docker
- [ ] Initialize Prisma schema
- [ ] Create basic Express server
- [ ] Set up React app with Vite

### Phase 2: Backend Development
- [ ] Design database schema for keyboards and users
- [ ] Implement user authentication (register/login)
- [ ] Create keyboard CRUD operations
- [ ] Add input validation with Zod
- [ ] Implement error handling middleware
- [ ] Write comprehensive API tests
- [ ] Add API documentation with Swagger

### Phase 3: Frontend Development
- [ ] Design component architecture
- [ ] Implement responsive layout with Tailwind
- [ ] Create keyboard catalog with filtering
- [ ] Build keyboard preview/detail pages
- [ ] Implement user authentication UI
- [ ] Add shopping cart functionality (preview only)
- [ ] Create admin dashboard for keyboard management

### Phase 4: Advanced Features
- [ ] Add keyboard customization options
- [ ] Implement search and filtering
- [ ] Add user wishlist functionality
- [ ] Create interest tracking system
- [ ] Add analytics and reporting
- [ ] Implement image upload for keyboards
- [ ] Add email notifications

### Phase 5: Testing & Optimization
- [ ] Write comprehensive unit tests
- [ ] Add integration tests
- [ ] Implement E2E testing with Playwright
- [ ] Performance optimization
- [ ] Security audit and fixes
- [ ] Accessibility improvements

## 🧪 Testing Strategy

### Backend Testing
- **Unit Tests**: Individual functions and services
- **Integration Tests**: API endpoints with database
- **E2E Tests**: Complete user workflows

### Frontend Testing
- **Component Tests**: Individual React components
- **Hook Tests**: Custom React hooks
- **Integration Tests**: Component interactions
- **E2E Tests**: User journeys with Playwright

## 📊 Database Schema

### Core Entities
- **Users**: Authentication and profile data
- **Keyboards**: Product information and specifications
- **Interest**: Track user interest in specific keyboards
- **Categories**: Keyboard categories and tags

## 🔒 Security Considerations

- Input validation and sanitization
- SQL injection prevention with Prisma
- XSS protection
- CSRF protection
- Rate limiting
- Secure authentication with JWT
- Environment variable management

## 📈 Performance Goals

- API response times < 200ms
- Page load times < 2 seconds
- Lighthouse score > 90
- 100% test coverage for critical paths

## 🖥️ Example API Usage (Keyboards)

### Create a new keyboard
```sh
curl -X POST http://localhost:3001/api/keyboards \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ergonomic Split Keyboard",
    "description": "A comfortable split keyboard for long typing sessions",
    "price": 299.99,
    "brand": "ErgoType",
    "layout": "split",
    "switches": "cherry-mx-brown",
    "keycaps": "PBT",
    "wireless": true,
    "rgb": false,
    "inStock": true,
    "stockCount": 10
  }'
```

### Get all keyboards
```sh
curl http://localhost:3001/api/keyboards
```

### Get a keyboard by ID
```sh
curl http://localhost:3001/api/keyboards/<keyboard_id>
```

### Update a keyboard
```sh
curl -X PUT http://localhost:3001/api/keyboards/<keyboard_id> \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Keyboard Name", "price": 199.99}'
```

### Delete a keyboard
```sh
curl -X DELETE http://localhost:3001/api/keyboards/<keyboard_id>
```

### Health check
```sh
curl http://localhost:3001/health
```

## 🤝 Contributing

This is a learning project, but contributions are welcome! Please follow the established coding standards and testing practices.

## 📚 Learning Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Testing Best Practices](https://testing-library.com/docs/react-testing-library/intro/)

## 📝 License

This project is for educational purposes.
