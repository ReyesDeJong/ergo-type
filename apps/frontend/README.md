# Ergo Type Frontend

A modern React TypeScript frontend for the Ergo Type keyboard store.

## Features

- **Vite + React + TypeScript**: Fast development with modern tooling
- **React Router**: Client-side routing with nested routes
- **Testing**: Jest + React Testing Library for component testing
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

# Format code
npm run format
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── KeyboardCard.tsx
│   └── KeyboardCard.css
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── HomePage.css
│   ├── KeyboardPreviewPage.tsx
│   └── KeyboardPreviewPage.css
├── services/           # API services
│   └── keyboardService.ts
├── types/              # TypeScript type definitions
│   └── keyboard.ts
├── test/               # Test setup
│   └── setup.ts
└── App.tsx             # Main application component
```

## API Integration

The frontend connects to the backend API at `http://localhost:3000/api`. Make sure the backend is running before starting the frontend.

### Available Endpoints

- `GET /api/keyboards` - Get all keyboards
- `GET /api/keyboards/:id` - Get keyboard by ID

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Vitest** - Testing framework
- **React Testing Library** - Component testing
- **ESLint** - Code linting
- **Prettier** - Code formatting
