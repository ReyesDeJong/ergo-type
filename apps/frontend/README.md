# Ergo Type Frontend

A modern React TypeScript frontend for the Ergo Type keyboard store.

## Features

- **Vite + React + TypeScript**: Fast development with modern tooling
- **React Router**: Client-side routing with nested routes
- **Testing**: Vitest + React Testing Library for component testing
- **ESLint + Prettier**: Code quality and formatting
- **Responsive Design**: Mobile-first approach with CSS Grid

## Getting Started

### Prerequisites

- Node.js 25 (recommended for full workspace support)
- npm
- nvm (Node Version Manager)

### Installation

> **Note**: This is part of a monorepo. For full setup instructions, see the [root README](../../README.md).

```bash
nvm use 25 && npm install
```

### Environment Setup

Copy the environment example file and configure your settings:

```bash
cp .env.example .env
```

Edit the `.env` file with your specific configuration values.

### Development

```bash
nvm use 25 && npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Testing

```bash
# From frontend directory
npm test                    # Run tests
npm run test:ui            # Run tests with UI
npm run test:coverage      # Run tests with coverage

# From root directory (using workspaces)
npm run test --workspace=@ergo-type/frontend
```

### Type Checking

```bash
# From frontend directory
npm run type-check

# From root directory (using workspaces)
npm run type-check --workspace=@ergo-type/frontend
```

### Linting and Formatting

```bash
# From frontend directory
npm run lint

# From root directory (using workspaces)
npm run lint --workspace=@ergo-type/frontend
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── services/           # API services
├── types/              # TypeScript type definitions
├── test/               # Test setup
│   └── setup.ts
└── App.tsx             # Main application component
```

## API Integration

The frontend connects to the backend API defined in the `.env` file. Make sure the backend is running before starting the frontend.

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Vitest** - Testing framework
- **React Testing Library** - Component testing
- **ESLint** - Code linting
- **Prettier** - Code formatting

## CI/CD Integration

This frontend is part of a comprehensive CI/CD pipeline that includes:

- **Automated Testing**: Vitest tests run on every commit
- **Type Checking**: TypeScript compilation verification
- **Code Quality**: ESLint and Prettier checks
- **Build Verification**: Production build testing
- **Coverage Reporting**: Test coverage tracking

For more details, see the [root README](../../README.md#continuous-integration-cicd).
