# Ergo-Type Backend API

A robust Express.js API server built with TypeScript, PostgreSQL, and Sequelize ORM for the Ergo-Type split keyboard web store.

## 🏗️ Architecture

```
src/
├── config/              # Database and application configuration
│   └── database.ts      # Sequelize database configuration
├── middleware/          # Custom Express middleware
│   └── errorHandler.ts  # Global error handling middleware
├── models/              # Sequelize database models
│   ├── index.ts         # Model associations and initialization
│   └── [model].ts       # Model definitions
├── routes/              # API route definitions
│   └── [resource].ts    # CRUD endpoints
├── scripts/             # Database management scripts
│   ├── drop-database.ts     # Drop database (removes database completely)
│   ├── seed-database.ts     # Seed with sample data
│   ├── setup-test-db.ts     # Test database setup
│   └── sync-database.ts     # Sync database schema
├── test/                # Backend tests
│   ├── [resource].test.ts   # API tests
│   └── setup.ts             # Test setup configuration
└── index.ts             # Main application entry point
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- npm

### Installation & Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp env.example .env
   ```

3. **Configure your `.env` file**
   ```env
   # Development Database
   DATABASE_URL=postgresql://username:password@localhost:5432/ergo_type_dev

   # Test Database (optional - will fall back to DATABASE_URL if not set)
   TEST_DATABASE_URL=postgresql://username:password@localhost:5432/ergo_type_test

   # Environment
   NODE_ENV=development

   # Server Configuration
   PORT=3001

   # CORS Configuration
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Database Setup**
   ```bash
   # Set up development database (creates database if it doesn't exist)
   npm run db:setup

   # Drop database (removes database completely)
   npm run db:drop

   # Seed with sample data
   npm run db:seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3001` (or the port specified in your `.env` file)

## 📊 API Endpoints

### Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Resource APIs

The API provides standard CRUD operations for various resources. Each resource follows RESTful conventions:

- `GET /api/[resource]` - Get all resources
- `GET /api/[resource]/:id` - Get resource by ID
- `POST /api/[resource]` - Create new resource
- `PUT /api/[resource]/:id` - Update resource
- `DELETE /api/[resource]/:id` - Delete resource

**Query Parameters (for list endpoints):**
- `limit` (optional): Number of resources to return (default: 50)
- `offset` (optional): Number of resources to skip (default: 0)

### Example Usage
```bash
# Get all resources
curl http://localhost:3001/api/[resource]

# Create a new resource
curl -X POST http://localhost:3001/api/[resource] \
  -H "Content-Type: application/json" \
  -d '{
    "field": "value"
  }'

# Health check
curl http://localhost:3001/health
```

## 🗄️ Database Schema

The application uses Sequelize ORM with PostgreSQL. Each model typically includes:

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `id` | INTEGER | Primary key, auto-increment | ✅ |
| `created_at` | DATE | Creation timestamp | ✅ |
| `updated_at` | DATE | Last update timestamp | ✅ |

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Set up test database
npm run test:setup
```

### Test Structure

- **Unit Tests**: Test individual functions and services
- **Integration Tests**: Test API endpoints with database
- **Test Database**: Separate test database for isolated testing

### Example Test

```typescript
describe('GET /api/keyboards', () => {
  it('should return all keyboards', async () => {
    const response = await request(app)
      .get('/api/keyboards')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });
});
```

## 🔧 Development Commands

### Development
```bash
npm run dev           # Start development server with hot reload
npm run build         # Build for production
npm run start         # Start production server
npm run type-check    # TypeScript type checking
```

### Code Quality
```bash
npm run lint          # Lint code with ESLint
npm run lint:fix      # Auto-fix linting issues
npm run format        # Format code with Prettier
npm run format:check  # Check code formatting
```

### Database Management
```bash
npm run db:setup      # Set up development database (creates if needed)
npm run db:sync       # Sync database schema
npm run db:seed       # Seed database with sample data
npm run db:drop       # Drop database (removes database completely)
npm run db:generate   # Generate new migration
npm run db:migrate    # Run pending migrations
```

## 🔒 Security Features

### Input Validation
All API endpoints use Zod schemas for request validation:

```typescript
const createResourceSchema = z.object({
  field: z.string().min(1).max(255)
});
```

### Security Middleware
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Morgan**: Request logging
- **Error Handling**: Centralized error handling without exposing internals

### Security Features
- **Input Validation**: Zod schema validation for all requests
- **SQL Injection Prevention**: Sequelize ORM with parameterized queries
- **Security Headers**: Helmet middleware for security headers
- **CORS Protection**: Configured CORS for frontend communication
- **Error Handling**: Centralized error handling without exposing internals

## 📈 Performance Optimization

### Database
- Connection pooling with Sequelize
- Proper indexing on frequently queried fields
- Query optimization

### API
- Response caching for static data
- Pagination for large datasets
- Efficient error handling

### Performance Goals
- API response times < 200ms
- Database query optimization
- Proper indexing strategy
- Connection pooling

## 🐛 Error Handling

The API uses a centralized error handling middleware that:

- Catches all unhandled errors
- Returns consistent error responses
- Logs errors for debugging
- Prevents sensitive information leakage

### Error Response Format
```json
{
  "error": {
    "message": "Error description",
    "status": 400,
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

## 📝 Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DATABASE_URL` | PostgreSQL connection URL | - | ✅ |
| `TEST_DATABASE_URL` | Test database connection URL | DATABASE_URL | ❌ |
| `PORT` | Server port | 3000 | ❌ |
| `NODE_ENV` | Environment | development | ❌ |
| `CORS_ORIGIN` | CORS origin | http://localhost:3000 | ❌ |

## 🔄 API Versioning

Currently using version 1 of the API. All endpoints are prefixed with `/api/`.

Future versions will be prefixed with `/api/v2/`, `/api/v3/`, etc.

## 📚 Dependencies

### Production Dependencies
- `express` - Web framework
- `sequelize` - ORM for PostgreSQL
- `pg` - PostgreSQL client
- `zod` - Schema validation
- `cors` - CORS middleware
- `helmet` - Security headers
- `morgan` - HTTP request logging
- `dotenv` - Environment variable management

### Development Dependencies
- `typescript` - TypeScript compiler
- `tsx` - TypeScript execution
- `jest` - Testing framework
- `supertest` - HTTP testing
- `@types/*` - TypeScript type definitions

## 🤝 Contributing

1. Follow TypeScript best practices
2. Write tests for new features
3. Use meaningful commit messages
4. Follow the existing code style (enforced by Prettier/ESLint)
5. Update documentation for new endpoints

## 📞 Support

For questions or issues:
1. Check the [main project README](../../README.md)
2. Review the test files for usage examples
3. Check the API documentation above

---

**Back to [Main Project README](../../README.md)**
