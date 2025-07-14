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

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Setup

Copy the environment example file and configure your settings:

```bash
cp .env.example .env
```

Edit the `.env` file with your specific configuration values.

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Testing

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Linting and Formatting

```bash
# Lint code
npm run lint
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
